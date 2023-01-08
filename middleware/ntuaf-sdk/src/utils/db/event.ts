import { dbInstance } from '../initFirebase';
import { getDoc, doc } from 'firebase/firestore';

export const getEvent = async (eventId: string) => {
	const result = await getDoc(doc(dbInstance, 'Events', eventId));
	console.log(result.data());
};
