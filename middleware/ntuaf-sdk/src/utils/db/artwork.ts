import { dbInstance } from '../initFirebase';
import { Artwork } from '../../types/types';
import { ARTWORK_TYPE } from '../../types/enums';
import { userEmail } from '../auth';
import { uploadImage } from '../storage';
import {
	collection,
	addDoc,
	query,
	orderBy,
	DocumentSnapshot,
	DocumentData,
	limit,
	startAfter,
	getDocs,
	where,
} from 'firebase/firestore';

/**
 * 上傳投稿表單
 * @param artwork 去掉對應參數
 * @returns 投稿唯一識別號
 */
export const createArtwork = async (
	artwork:
		| Pick<Artwork, 'type' | 'name' | 'text' | 'url'>
		| Pick<Artwork, 'type' | 'name' | 'text'>
) => {
	const {
		type,
		name,
		text = '',
		url = null,
	} = artwork as Pick<Artwork, 'type' | 'name' | 'text' | 'url'>;
	if (!Object.values(ARTWORK_TYPE).includes(type))
		throw 'not exist type of artwork';
	if (type !== ARTWORK_TYPE.PURE_TEXT && url == null)
		throw 'please input image for this type artwork';
	if (!name || (!url && text == '')) throw 'less name or url or text';
	const email = userEmail();
	if (!email) throw 'Should login first';
	const newUrl = !url ? null : await uploadImage(url);
	const newArtwork: Artwork = {
		type,
		email,
		url: newUrl,
		text,
		name,
		createTime: new Date().getTime(),
		like: 0,
		tmpLike: 0,
	};
	const result = await addDoc(collection(dbInstance, 'Artworks'), newArtwork);
	return result.id;
};

/**
 * 依類別獲取投稿內容
 * @param type 投稿類別
 * @param cursor page 游標, 輸入 null 表示從頭取
 * @returns data 為數據, cursor 為下一頁的游標, 游標為 null 表示最末頁
 */
export const getArtworkList = async (
	type: ARTWORK_TYPE,
	cursor: DocumentSnapshot<DocumentData> | null = null
) => {
	if (!Object.values(ARTWORK_TYPE).includes(type))
		throw 'not exist type of artwork';
	const queryCommand = cursor
		? query(
				collection(dbInstance, 'Artworks'),
				orderBy('like'),
				where('type', '==', type),
				startAfter(cursor),
				limit(10)
		  )
		: query(
				collection(dbInstance, 'Artworks'),
				orderBy('like'),
				where('type', '==', type),
				limit(10)
		  );
	const result = await getDocs(queryCommand);
	if (result.size == 0) {
		return {
			cursor: null,
			data: [],
		};
	}
	const nextCursor = result.size < 10 ? null : result.docs[result.size - 1];
	return {
		cursor: nextCursor as DocumentSnapshot<DocumentData>,
		data: result.docs.map((v) => {
			return { id: v.id, ...v.data() } as Artwork;
		}),
	};
};

export const getLikeToday = async () => {};

export const likeArtwork = async () => {};

export const unlikeArtwork = async () => {};
