import { dbInstance } from '../initFirebase';
import { Artwork } from '../../types/types';
import { ARTWORK_TYPE } from '../../types/enums';
import { userEmail, userId } from '../auth';
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
	getDoc,
	doc,
	setDoc,
	updateDoc,
	increment,
} from 'firebase/firestore';

/**
 * 上傳投稿表單
 * @param artwork 去掉對應參數
 * @returns 投稿唯一識別號
 * @description 重要: 上傳本地圖片需要用 URL.createObjectURL(blob) 轉換成 url
 * @example
 * // 創建含圖片投稿
 * await createArtwork({type: ARTWORK_TYPE.PAINTING,name: '王小小',url,text: '測試文字內容',})
 * // 不含圖片投稿
 * await createArtwork({type: ARTWORK_TYPE.PURE_TEXT,name: '王小小',text: '測試文字內容',})
 */
export const createArtwork = async (
	artwork:
		| Pick<Artwork, 'type' | 'name' | 'artworkName' | 'text' | 'url'>
		| Pick<Artwork, 'type' | 'name' | 'artworkName' | 'text'>
) => {
	const {
		type,
		name,
		text = '',
		url = null,
		artworkName,
	} = artwork as Pick<
		Artwork,
		'type' | 'name' | 'text' | 'url' | 'artworkName'
	>;
	if (!Object.values(ARTWORK_TYPE).includes(type))
		throw 'not exist type of artwork';
	if (type !== ARTWORK_TYPE.PURE_TEXT && url == null)
		throw 'please input image for this type artwork';
	if (!name || !artworkName || (!url && text == ''))
		throw 'less name or url or text';
	const email = userEmail();
	if (!email) throw 'Should login first';
	const newUrl = !url ? null : await uploadImage(url);
	const newArtwork: Artwork = {
		type,
		email,
		url: newUrl,
		text,
		name,
		artworkName,
		createTime: new Date().getTime(),
		like: 0,
		tmpLike: 0,
	};
	const result = await addDoc(collection(dbInstance, 'Artworks'), newArtwork);
	return result.id;
};

const correctArtworks = ({
	type = ARTWORK_TYPE.PAINTING,
	name = '作者暱稱',
	artworkName = '作品名稱',
	email = '為設定 email',
	url = '',
	text = '',
	createTime = 0,
	like = 0,
	tmpLike = 0,
}: Artwork) => {
	return {
		type,
		name,
		artworkName,
		email,
		url,
		text,
		createTime,
		like,
		tmpLike,
	} as Artwork;
};

/**
 * 依類別獲取投稿內容
 * @param type 投稿類別
 * @param orderByCol 利用喜歡數或創建時間排序
 * @param cursor page 游標, 輸入 null 表示從頭取
 * @returns data 為數據, cursor 為下一頁的游標, 游標為 null 表示最末頁
 * @example
 * // 用 like 排序, 從頭排
 * let {cursor} = await getArtworkList(ARTWORK_TYPE.PURE_TEXT, 'like');
 * // 下一頁
 * await getArtworkList(ARTWORK_TYPE.PURE_TEXT, 'like', cursor)
 */
export const getArtworkList = async (
	type: ARTWORK_TYPE,
	orderByCol: 'like' | 'createTime',
	cursor: DocumentSnapshot<DocumentData> | null = null
) => {
	if (orderByCol !== 'like' && orderByCol !== 'createTime')
		throw 'orderByCol should be [like] or [createTime]';
	if (!Object.values(ARTWORK_TYPE).includes(type))
		throw 'not exist type of artwork';
	const queryCommand = cursor
		? query(
				collection(dbInstance, 'Artworks'),
				orderBy(orderByCol, 'desc'),
				where('type', '==', type),
				startAfter(cursor),
				limit(10)
		  )
		: query(
				collection(dbInstance, 'Artworks'),
				orderBy(orderByCol, 'desc'),
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
			const newData = correctArtworks(v.data() as Artwork);
			return { id: v.id, ...newData } as Artwork;
		}),
	};
};
/**
 * 獲取該用戶當日的喜愛作品
 * @returns 作品編號列表
 * @example
 * await getLikeArtworkToday() // ['id1','id2']
 */
export const getLikeArtworkToday = async () => {
	const id = userId();
	if (!id) throw 'should login first';
	const data = (await getDoc(doc(dbInstance, 'UserTmpData', id))).data() as
		| { likeArtwork: string[] }
		| undefined;
	if (!data) return [] as string[];
	return data.likeArtwork;
};

const removeItem = <T>(arr: Array<T>, value: T): Array<T> => {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};
/**
 * 觸發用戶對投稿的喜歡事件, 第一次是喜歡, 第二次是取消
 * @param artworkId 投稿編號
 * @returns 當前的喜歡列表
 * @example
 * await getLikeArtworkToday() // []
 * await triggerLikeArtwork('id5') // ['id5']
 */
export const triggerLikeArtwork = async (artworkId: string) => {
	const currentList = await getLikeArtworkToday();
	const isInclude = currentList.includes(artworkId);
	// 追加,或消去
	isInclude ? removeItem(currentList, artworkId) : currentList.push(artworkId);
	// 查看是否合法
	if (currentList.length > 3) {
		throw 'user can not like more than 3 items';
	}
	await updateDoc(doc(dbInstance, 'Artworks', artworkId), {
		tmpLike: increment(isInclude ? -1 : 1),
	});
	await setDoc(doc(dbInstance, 'UserTmpData', userId()), {
		likeArtwork: currentList,
	});
	return currentList;
};
