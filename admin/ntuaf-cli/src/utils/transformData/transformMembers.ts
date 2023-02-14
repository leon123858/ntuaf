import { db } from '../../init';
const {FieldValue } = require('firebase-admin/firestore');
const transformMembers = async ()=>{
    console.log("transformMembersByDepartment")
    const key:string = "data"
    const ref = await db.collection("Members").get()
    ref.forEach(async (doc) => {
        // initialize each department list
        const department = doc.data().department
        const docRef = db.collection("Cache/Members/Department").doc(department)
        await docRef.set({[key]:[]})
    });
    ref.forEach(async (doc)=>{
        // fill each department list
        const department = doc.data().department
        const docRef = db.collection("Cache/Members/Department").doc(department)
        await docRef.update({
            [key]: FieldValue.arrayUnion({name:doc.data().name, job:doc.data().job})
        });
    })
    

}
export {transformMembers}