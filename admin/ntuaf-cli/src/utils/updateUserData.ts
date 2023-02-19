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

import { UserTmpData } from '@leon123858/ntuaf-sdk';
import { firestore } from 'firebase-admin';
import { db } from '../init';

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
		await db.collection('UserTmpDatas').add({
			likeArtwork: innerArtworkIds,
		});
	}
};

const deleteAllUserTmpData = async () => {
	const snapshot = await db.collection('UserTmpDatas').get();
	snapshot.forEach(async (doc) => {
		await db.collection('UserTmpDatas').doc(doc.id).delete();
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
	const snapshot = await db.collection('UserTmpDatas').get();
	for (let i of snapshot.docs) {
		const data = i.data() as UserTmpData;
		if (!isValidateTmpData(data, i.id)) {
			continue;
		}
		try {
			await Promise.all(
				data.likeArtwork.map(async (v) =>
					db
						.collection('Artworks')
						.doc(v)
						.update({ like: firestore.FieldValue.increment(1) })
				)
			);
		} catch (err) {
			console.error(err);
		}
	}
};

export {
	createFakeTmpData,
	deleteAllUserTmpData,
	setAllTmpDataAsInit,
	updateArtworkLike,
};
