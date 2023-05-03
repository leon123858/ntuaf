import { mkdir, writeFile } from 'node:fs/promises';
import data from './data.json' assert { type: 'json' };

//#region 創建資料夾結構的方法
const createSubFolder = async (path, object, head = 'basic information') => {
	const list = [];
	for (let i of Object.keys(object).sort()) {
		list.push(`${i} : ${object[i]}`);
	}
	await mkdir(path, { recursive: true });
	await writeFile(
		`${path}/information.txt`,
		list.reduce((pre, cur) => {
			return pre + cur + '\n';
		}, head + '\n')
	);
	if (object.作品網址 !== null) {
		// object.url
		try {
			await fetch(object.作品網址)
				.then((response) => response.blob())
				.then(async (blob) => {
					await writeFile(
						`${path}/image.png`,
						Buffer.from(await blob.arrayBuffer())
					);
				});
		} catch (err) {
			console.log(err);
			console.log(object);
		}
	}
};

//#endregion

//#region 定義欄位微調的方法
const mapInfo = ({
	__id,
	artworkName,
	createTime,
	name,
	text,
	type,
	email,
	like,
	originUrl,
	url,
}) => {
	const date = new Date(createTime);
	return {
		唯一編號: __id,
		作品名稱: artworkName,
		上傳時間: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
		作者: name,
		介紹文字: text,
		參賽組別: type,
		作者信箱: email,
		作者當時愛心數: like,
		作品網址: originUrl !== null && originUrl !== '' ? originUrl : url,
	};
};

//#endregion

//#region 寫入物件的方法
!(async function () {
	await Promise.all(
		data.map(async (obj) => {
			return createSubFolder(
				`./${obj.type}/${obj.artworkName}`,
				mapInfo(obj),
				'基本介紹'
			);
		})
	);
})();

//#endregion
