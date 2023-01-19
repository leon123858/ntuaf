import { storageInstance } from './initFirebase';
import { userId } from './auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

/**
 * 上傳圖片
 * @param url 本機圖片網址
 * @returns 下載圖片網址
 */
export const uploadImage = async (url: string) => {
	const uid = userId();
	if (!url || !uid) throw 'should have url and login when upload image';
	const file = await fetch(url).then((result) => result.blob());
	if (!['image/png', 'image/jpeg'].includes(file.type))
		throw 'only can use jpg or png';
	if (file.size > 25 * 1024 * 1024) throw 'the max file size is 25MB';
	const reference = ref(
		storageInstance,
		`images/${uid}/${new Date().getTime()}`
	);
	const buffer = await file.arrayBuffer();
	const result = await uploadBytes(reference, buffer, {
		contentType: file.type,
	});
	const newUrl = await getDownloadURL(result.ref);
	return newUrl;
};
