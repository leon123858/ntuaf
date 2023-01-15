import { dbInstance } from '../initFirebase';
import { collection, addDoc } from 'firebase/firestore';
import { Artwork } from '../../types/types';
import { ARTWORK_TYPE } from '../../types/enums';
import { userEmail } from '../auth';
import { uploadImage } from '../storage';

/**
 * 上傳投稿表單
 * @param artwork 去掉對應參數
 * @returns 投稿唯一識別號
 */
export const createArtwork = async (
	artwork: Omit<Artwork, 'id' | 'email' | 'createTime' | 'like' | 'tmpLike'>
) => {
	const { type, name, url = null, text = '' } = artwork;
	const email = userEmail();
	if (!email) throw 'Should login first';
	if (!Object.values(ARTWORK_TYPE).includes(type))
		throw 'not exist type of artwork';
	if (!name || (!url && text == '')) throw 'less name or url or text';
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

export const getArtworkList = async () => {};

export const likeArtwork = async () => {};

export const unlikeArtwork = async () => {};
