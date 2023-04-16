import { db } from '../../init';
import moment from 'moment';
import { EVENT_TYPE, Event } from '@leon123858/ntuaf-sdk';
const { FieldValue } = require('firebase-admin/firestore');

const createDateString = (start: number, end: number) => {
	if (moment(start).isSame(moment(end), 'day')) {
		return `${moment(start).format('MM/DD')}`;
	}
	return `${moment(start).format('MM/DD')}-${moment(end).format('MM/DD')}`;
};

function randomNoRepeats(array: Event[]) {
	let copy = array.slice(0);
	return function () {
		if (copy.length < 1) {
			copy = array.slice(0);
		}
		const index = Math.floor(Math.random() * copy.length);
		const item = copy[index];
		copy.splice(index, 1);
		return item;
	};
}

const transformRegularEvent = async () => {
	const toDbPath = 'Cache/Events/Recommend';
	const fromDbPath = 'Events';
	const id: string = 'always';
	const key: string = 'data';
	const maxNumOfEvent = 5;
	const ref = await db.collection(fromDbPath).get();
	//info for regular events: transform Cache/RegularEvents/Events document to Cache/Events/Recommend
	const docRef = db.collection(toDbPath).doc(id);
	const exhibitions = ref.docs
		.filter((doc) => (doc.data() as Event).type === EVENT_TYPE.展覽)
		.map((doc) => doc.data() as Event);
	const randomExhibitionGet = randomNoRepeats(exhibitions);
	// initialize list
	await docRef.set({ [key]: [] });
	for (let i = 0; i < maxNumOfEvent; i++) {
		const doc = randomExhibitionGet();
		await docRef.update({
			//? what is image and text for an event
			[key]: FieldValue.arrayUnion({
				image: doc.image,
				text: doc.title,
				id: doc.id,
				date: createDateString(doc.startTime, doc.endTime),
				info: doc.blocks[0]?.text || '無資料',
			}),
		});
	}
};

const transformRecentEvent = async () => {
	// info for recent events: use the start time of event to judge if it upcoming events
	// info the definition of recent event: the event haven't start or we're in the period of event
	const fromDbPath = 'Events';
	const toDbPath = 'Cache/Events/Recommend';
	const id: string = 'recent';
	const key: string = 'data';
	const ref = await db.collection(fromDbPath).get();
	const event: { [k: string]: Event } = {};
	ref.forEach((doc) => {
		event[doc.data().startTime] = doc.data() as Event;
	});
	const orderedKey = Object.keys(event).sort();
	const currentTimeStamp = moment().valueOf();
	const maxNumOfEvent = 5;
	let count = 0;
	let recentEvents = orderedKey.map((startTime) => {
		if (
			(parseInt(startTime) > currentTimeStamp ||
				(parseInt(startTime) < currentTimeStamp &&
					currentTimeStamp < event[startTime].endTime)) &&
			event[startTime].type !== EVENT_TYPE.展覽
		) {
			count++;
			if (count > maxNumOfEvent) {
				return;
			}
			return {
				image: event[startTime].image,
				text: event[startTime].title,
				id: event[startTime].id,
				date: createDateString(
					event[startTime].startTime,
					event[startTime].endTime
				),
				info: event[startTime].blocks[0]?.text || '無資料',
			};
		}
	});
	recentEvents = recentEvents.filter((e) => e != undefined);
	const docRef = db.collection(toDbPath).doc(id);
	await docRef.set({ [key]: [] });
	await db
		.collection(toDbPath)
		.doc(id)
		.set({ [key]: recentEvents });
};
const transformRecommendEvents = async () => {
	await Promise.all([transformRegularEvent(), transformRecentEvent()]);
	console.log('transformRecommendEvents OK!');
};

export { transformRecommendEvents };
