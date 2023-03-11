import { db } from '../../init';
const { FieldValue } = require('firebase-admin/firestore');
const transformMembers = async () => {
	console.log('transformMembersByDepartment');
	const key: string = 'data';
	const ref = await db.collection('Members').get();
	const init = async ()=>{
		ref.forEach(async (doc) => {
			// initialize each department list
			const department = doc.data().department;
			const docRef = db.collection('Cache/Members/Department').doc(department);
			await docRef.set({ [key]: [] });
			console.log("init ", department)
			return
		})
		return
	}
	// await init()
	for (let doc of ref.docs){
		const department = doc.data().department;
		const docRef = db.collection('Cache/Members/Department').doc(department);
		await docRef.set({ [key]: [] });
		console.log("init ", department)
	}
	for (let doc of ref.docs){
		const department = doc.data().department;
			const docRef = db.collection('Cache/Members/Department').doc(department);
			await docRef.update({
				[key]: FieldValue.arrayUnion({
					name: doc.data().name,
					job: doc.data().job,
				}),
			});
		console.log("insert ", doc.data().name)
	}
	const init2 = ()=>{
		for (let doc in ref){
			console.log(doc)
		}
	}
	// init2()
	const createCache = async ()=>{
		for(let doc of ref.docs){
			const department = doc.data().department;
			const docRef = db.collection('Cache/Members/Department').doc(department);
			await docRef.update({
				[key]: FieldValue.arrayUnion({
					name: doc.data().name,
					job: doc.data().job,
				}),
			});
			console.log("insert ", doc.data().name)
		}
		await Promise.all(ref.docs.map(async doc=> {
			const department = doc.data().department;
			const docRef = db.collection('Cache/Members/Department').doc(department);
			docRef.update({
				[key]: FieldValue.arrayUnion({
					name: doc.data().name,
					job: doc.data().job,
				}),
			});
		}))
	}
	// await createCache()
	
};
export { transformMembers };
