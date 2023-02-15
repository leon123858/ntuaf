import { db } from '../init';

const createAlwaysEvent = async (eventId: string) => {
	const eventRef = await db.collection('Events').doc(eventId).get();
	await db
		.collection('Cache/RegularEvents/Events')
		.doc(eventId)
		.set({ data: eventRef.data() });
};

export { createAlwaysEvent };
