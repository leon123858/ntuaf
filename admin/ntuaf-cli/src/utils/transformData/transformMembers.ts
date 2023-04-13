import { db } from '../../init';
const { FieldValue } = require('firebase-admin/firestore');
const transformMembers = async () => {
	console.log('transformMembersByDepartment');
	const key: string = 'data';
	const ref = await db.collection('Members').get();

	// init list
	for (let doc of ref.docs) {
		const department = doc.data().department;
		const docRef = db.collection('Cache/Members/Department').doc(department);
		await docRef.set({ [key]: [] });
		// console.log('init ', department);
	}
	// fill list
	await Promise.all(
		ref.docs.map(async (doc) => {
			const department = doc.data().department;
			const docRef = db.collection('Cache/Members/Department').doc(department);
			docRef.update({
				[key]: FieldValue.arrayUnion({
					name: doc.data().name,
					job: doc.data().job,
				}),
			});
			// console.log(doc.data().name, doc.data().job, department)
		})
	);
};
export { transformMembers };
