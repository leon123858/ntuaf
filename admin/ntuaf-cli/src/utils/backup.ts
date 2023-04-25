import { db, storage } from '../init';
import moment from 'moment';

/**
 * upload string to cloud storage
 * @param path
 * @param data
 * @returns
 */
const uploadJson2Storage = (path: string, data: string) => {
	const remoteFile = storage.bucket().file(`${path}`);
	const stream = remoteFile.createWriteStream({
		contentType: 'application/json',
	});
	return new Promise(
		(resolve: (a: string) => void, reject: (a: string) => void) => {
			stream.on('error', (err) => {
				reject(`upload to cloud storage for ${path} error: ${err.message}`);
			});
			stream.end(data, async () => {
				resolve('OK!');
			});
		}
	);
};

/**
 * 備份
 * @param names 要備份的 collection name
 */
const backupCollections = async (names: string[]) => {
	names.forEach(async (name) => {
		const data = (await db.collection(name).get()).docs.map((doc) => {
			return {
				__id: doc.id,
				...doc.data(),
			};
		});
		await uploadJson2Storage(
			`backup/${moment().format('DD-MM-YYYY')}/${name}.json`,
			JSON.stringify(data)
		);
	});
};

export { backupCollections };
