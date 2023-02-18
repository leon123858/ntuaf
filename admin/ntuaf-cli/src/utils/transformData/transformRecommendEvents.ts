import { db } from '../../init';
import moment from 'moment';
import { Event } from '@leon123858/ntuaf-sdk';
const { FieldValue } = require('firebase-admin/firestore');

const createDateString = (start: number, end: number) => {
	return `${moment(start).format('MM/DD')}-${moment(end).format('MM/DD')}`;
};

const transformRegularEvent = async () => {
	const toDbPath = 'Cache/Events/Recommend';
	const fromDbPath = 'Cache/RegularEvents/Events';
	const id: string = 'always';
	const key: string = 'data';
	const ref = await db.collection(fromDbPath).get();
	//info for regular events: transform Cache/RegularEvents/Events document to Cache/Events/Recommend
	const docRef = db.collection(toDbPath).doc(id);
	// initialize list
	await docRef.set({ [key]: [] });
	ref.forEach(async (doc) => {
		// fill list
		const docRef = db.collection(toDbPath).doc(id);
		await docRef.update({
			//? what is image and text for an event
			[key]: FieldValue.arrayUnion({
				image: doc.data().data.image,
				text: doc.data().data.title,
				id: doc.data().data.id,
				date: createDateString(
					doc.data().data.startTime,
					doc.data().data.endTime
				),
				info:doc.data().data.blocks[0].text
			}),
		});
	});
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
	const maxNumOfEvent = 10
	let count = 0
	let recentEvents = orderedKey.map((startTime) => {
		if (
			parseInt(startTime) > currentTimeStamp ||
			(parseInt(startTime) < currentTimeStamp &&
				currentTimeStamp < event[startTime].endTime)
		) {
			//? what is image and text for an event
			count++
			if (count>maxNumOfEvent){
				return
			}
			return {
				image: event[startTime].image,
				text: event[startTime].title,
				id: event[startTime].id,
				date: createDateString(
					event[startTime].startTime,
					event[startTime].endTime
				),
				info:event[startTime].blocks[0].text
			};
		}
	});
	recentEvents = recentEvents.filter((e)=>e!=undefined)
	const docRef = db.collection(toDbPath).doc(id);
	await docRef.set({ [key]: [] });
	await db
		.collection(toDbPath)
		.doc(id)
		.set({ [key]: recentEvents });
};
const transformRecommendEvents = async () => {
	console.log('transformRecommendEvents');
	transformRegularEvent();
	transformRecentEvent();
};

export { transformRecommendEvents };
