import { randomUUID } from 'crypto';
import { db, storage } from '../init';
import fs from 'fs/promises';
import { Event } from '@leon123858/ntuaf-sdk';
const webp = require('webp-converter');
webp.grant_permission();

const compressEventBannerImage = async () => {
	const events = await db.collection('Events').get();
	if (events.size === 0) {
		console.log('no event in db');
		return;
	}
	await fs.mkdir('./tmp', { recursive: true });
	events.forEach(async (doc) => {
		const tmpFileName = randomUUID();
		let path = `./tmp/${tmpFileName}`;
		const data = doc.data() as Event;
		if (data.image.banner == '') {
			return;
		}
		const file = await fetch(data.image.banner).then((result) => result.blob());
		const preBuffer = Buffer.from(await file.arrayBuffer());
		if (file.type === 'image/png') {
			path += '.png';
		} else if (file.type === 'image/jpeg') {
			path += '.jpg';
		} else {
			console.log(`image type of ${doc.id} error`);
			return;
		}
		await fs.writeFile(path, preBuffer);
		await webp.cwebp(path, path, '-q 50');
		const newImage = await fs.readFile(path);
		const remoteFile = storage.bucket().file(`webp/${doc.id}.webp`);
		const stream = remoteFile.createWriteStream({
			contentType: 'image/webp',
		});
		stream.on('error', (err) => {
			throw `upload to cloud storage for ${doc.id} error: ${err.message}`;
		});
		stream.end(newImage, async () => {
			const newUrl = (
				await remoteFile.getSignedUrl({
					action: 'read',
					expires: '01-01-2030',
				})
			)[0];
			await db
				.collection('Events')
				.doc(doc.id)
				.update({
					image: {
						banner: data.image.banner,
						card: newUrl,
					},
				} as Pick<Event, 'image'>);
			await fs.rm(path);
			return;
		});
	});
};

export { compressEventBannerImage };
