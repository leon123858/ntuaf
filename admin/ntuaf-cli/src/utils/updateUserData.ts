/**
 * step0. 建立假資料
 * step1. 遍歷所有 UserTmpData
 * step2. 輸入校正(validation) 遇到錯誤就外丟 error, 外面 try...catch, log 出來, skip item
 *	- 確認每個 string list id 唯一
 *  - 正規判斷 => id 格式
 *	- 不能超過 0,1,2,3 個
 * step3. 掃所有 user tmp like string 加到所有 artwork (for in Array 該 await await)
 * step4. 刪除所有 UserTmpData
 * step5. 所有 tmpLike 歸 0 (for in Array 該 await await)
 */

import { ARTWORK_TYPE, Artwork, UserTmpData } from '@leon123858/ntuaf-sdk';
import { firestore } from 'firebase-admin';
import { db, storage } from '../init';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
	const exec = require('child_process').exec;
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

const createFakeTmpData = async () => {
	// get all artwork id
	const artworkIds = (await db.collection('Artworks').get()).docs.map(
		(v) => v.id
	);
	const randomArtwork = () => {
		return artworkIds[Math.floor(Math.random() * artworkIds.length)];
	};
	const randomCount = (array: number[]) => {
		return array[Math.floor(Math.random() * array.length)];
	};
	// insert fake data
	for (let i = 0; i < 20; i++) {
		const innerArtworkIds = [...new Array(randomCount([0, 1, 2, 3]))].map((_) =>
			randomArtwork()
		);
		await db.collection('UserTmpData').add({
			likeArtwork: innerArtworkIds,
		});
	}
};

const deleteAllUserTmpData = async () => {
	const snapshot = await db.collection('UserTmpData').get();
	snapshot.forEach(async (doc) => {
		await db.collection('UserTmpData').doc(doc.id).delete();
	});
};

const setAllTmpDataAsInit = async () => {
	const snapshot = await db.collection('Artworks').get();
	snapshot.forEach(async (doc) => {
		await db.collection('Artworks').doc(doc.id).update({ tmpLike: 0 });
	});
};

const updateArtworkLike = async () => {
	const isValidateTmpData = (tmp: UserTmpData, id: string) => {
		const { likeArtwork } = tmp;
		if (!Array.isArray(likeArtwork)) {
			console.log('應有參數不存在', id);
			return false;
		}
		if (likeArtwork.length > 3) {
			console.log('長度過長', id);
			return false;
		}
		if (new Set(likeArtwork).size < likeArtwork.length) {
			console.log('內容重複', id);
			return false;
		}
		// sample user ID: KrZOujbKgcTtZF9gWuHnTDBfhiM2
		for (let i of likeArtwork) {
			// 限制只有英文數字(測試時需取消, 因為測資有特殊字元)
			if (i.replace(/[^a-zA-Z0-9 ]/g, '').length < i.length) {
				console.log('非法字元', id);
				return false;
			}
		}
		return true;
	};
	const snapshot = await db.collection('UserTmpData').get();
	for (let i of snapshot.docs) {
		const data = i.data() as UserTmpData;
		if (!isValidateTmpData(data, i.id)) {
			continue;
		}
		try {
			const results = await Promise.allSettled(
				data.likeArtwork.map(async (v) =>
					db
						.collection('Artworks')
						.doc(v)
						.update({ like: firestore.FieldValue.increment(1) })
				)
			);
			results.forEach((item) => {
				if (item.status == 'rejected') {
					console.log(
						`${i.id} 的喜歡列表:${JSON.stringify(
							data.likeArtwork
						)}更新失敗(若有刪除投稿則屬正常現象)`
					);
				}
			});
		} catch (err) {
			console.error(err);
		}
	}
};

const compressNewArtworkImage = async () => {
	const newArtworks = await db
		.collection('Artworks')
		.where('originUrl', '==', '')
		.where('type', '!=', ARTWORK_TYPE.PURE_TEXT)
		.get();
	if (newArtworks.size === 0) {
		console.log('new image artwork count is zero');
		return;
	}
	await fs.mkdir('./tmp', { recursive: true });
	for (let doc of newArtworks.docs) {
		const tmpFileName = randomUUID();
		let path = `./tmp/${tmpFileName}`;
		const data = doc.data() as Artwork;
		const file = await fetch(data.url).then((result) => result.blob());
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
		await execShellCommand(`optimizt ${path}`);
		const newImage = await fs.readFile(path);
		const remoteFile = storage.bucket().file(`preview/${doc.id}`);
		const stream = remoteFile.createWriteStream({
			contentType: file.type,
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
				.collection('Artworks')
				.doc(doc.id)
				.update({
					url: newUrl,
					originUrl: data.url,
				} as Pick<Artwork, 'url' | 'originUrl'>);
			await fs.rm(path);
		});
	}
};

export {
	createFakeTmpData,
	deleteAllUserTmpData,
	setAllTmpDataAsInit,
	updateArtworkLike,
	compressNewArtworkImage,
};
