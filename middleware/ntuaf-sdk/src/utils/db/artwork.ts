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

export const getArtworkList = async () => {};

export const likeArtwork = async () => {};

export const unlikeArtwork = async () => {};
