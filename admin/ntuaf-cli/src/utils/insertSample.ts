import { db } from '../init';

const insertSample = async () => {
	const cityRef = db.collection('cities').doc('BJ');
	const res = await cityRef.set(
		{
			capital: true,
		},
		{ merge: true }
	);
};

export { insertSample };
