import { connectEmulator } from '../src/utils/connectEmulator';
// import { Member, Artwork, Event } from '../src/types/types';
// import { DEPARTMENT, ARTWORK_TYPE, EVENT_TYPE } from '../src/types/enums';
// import { dbInstance } from '../src/utils/initFirebase';
// import { doc, setDoc } from 'firebase/firestore';

// const artworks: Artwork[] = [
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PHOTO,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PHOTO,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 	},
// ];
// const events: Event[] = [
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.展覽,
// 		title: 'test1',
// 		blocks: [],
// 	},
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.工作坊,
// 		title: 'test2',
// 		blocks: [],
// 	},
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.活動,
// 		title: 'test3',
// 		blocks: [],
// 	},
// ];
before(async function () {
	//this.timeout(100 * 1000);
	console.log('start test');
	connectEmulator();
	// // create data (show open rule, just use when no save-data)
	// await Promise.all(
	// 	members.map((v, i) => {
	// 		return setDoc(doc(dbInstance, 'Members', `${v.email}`), {
	// 			name: v.name,
	// 			department: [v.department],
	// 			admin: [],
	// 		} as Member);
	// 	})
	// );
	// await Promise.all(
	// 	artworks.map((v, i) => {
	// 		const { name, email, url, text, createTime } = v;
	// 		return setDoc(doc(dbInstance, 'Artworks', `test${i}`), {
	// 			...v,
	// 			name: name + i,
	// 			email: email + i,
	// 			url: url + i,
	// 			text: text + i,
	// 			createTime: createTime + i,
	// 		});
	// 	})
	// );
	// await Promise.all(
	// 	events.map((v, i) => {
	// 		return setDoc(doc(dbInstance, 'Events', `test${i}`), v);
	// 	})
	// );
});

after(async () => {
	console.log('end test');
});
