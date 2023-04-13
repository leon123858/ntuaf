import moment from 'moment';
import { db } from '../../init';
import { EVENT_TYPE } from '@leon123858/ntuaf-sdk';
const { FieldValue } = require('firebase-admin/firestore');

const createDateString = (start: number, end: number) => {
	if (moment(start).isSame(moment(end), 'day')) {
		return `${moment(start).format('MM/DD')}`;
	}
	return `${moment(start).format('MM/DD')}-${moment(end).format('MM/DD')}`;
};

const transformTabEvents = async () => {
	console.log('transformTabEvents');
	const toDbPath = '/Cache/Events/TabEvents';
	const fromDbPath = 'Events';
	const key = 'data';
	//? Is that the way we distinguish two different events?
	const ref = db.collection(toDbPath).doc(EVENT_TYPE.展覽);
	await ref.set({ data: [] });
	await db
		.collection(toDbPath)
		.doc('活動')
		.set({ [key]: [] });
	const collectionRef = await db.collection(fromDbPath).get();
	const noTopicDocs = collectionRef.docs
		.filter((e) => {
			return e.data().topic ? false : true;
		})
		.sort((a, b) => a.data().startTime - b.data().startTime);
	const haveTopicDocs = collectionRef.docs
		.filter((e) => {
			return e.data().topic ? true : false;
		})
		.sort((a, b) => a.data().startTime - b.data().startTime)
		.sort((a, b) => {
			return ('' + a.data().topic).localeCompare(b.data().topic);
		});
	for (let docs of [noTopicDocs, haveTopicDocs]) {
		for (let doc of docs) {
			const data = doc.data();
			if (data.type === EVENT_TYPE.展覽) {
				await db
					.collection(toDbPath)
					.doc(EVENT_TYPE.展覽)
					.update({
						//? what is the meaning for each field
						[key]: FieldValue.arrayUnion({
							subTab: data.type,
							title: data.title,
							date: createDateString(data.startTime, data.endTime),
							url: data.image.card,
							id: data.id,
						}),
					});
			} else {
				await db
					.collection(toDbPath)
					.doc('活動')
					.update({
						[key]: FieldValue.arrayUnion({
							subTab: !data.topic ? data.type : `${data.topic} | ${data.type}`,
							title: data.title,
							date: createDateString(data.startTime, data.endTime),
							url: data.image.card,
							id: data.id,
						}),
					});
			}
		}
	}
};

export { transformTabEvents };
