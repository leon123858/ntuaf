import { db } from '../init';
const {FieldValue } = require('firebase-admin/firestore');
import { getDoc, doc } from 'firebase/firestore';

import {DEPARTMENT, Artwork, ARTWORK_TYPE, Event, Place, Images, EVENT_TYPE, Block, BlOCK_TYPE, ITEM_TYPE, Item} from "@leon123858/ntuaf-sdk"
const transformMembersByDepartment = async ()=>{
    console.log("transformMembersByDepartment")


    // const docRef =  db.collection("Cache/Members/Department").doc()
    // await docRef.set(tmp)
    // const collectionRef = await db.collection("Cache/Members/Department").where('id', '==', "id1234").get()
    // collectionRef.forEach((doc)=>console.log(doc.data()))
    // return
    // const tmp1 = await db.collection("Cache/Members/Department").get()
    // tmp1.forEach((doc)=>console.log(doc.id))
    // const docRef = db.collection("Cache/Members/Deparment").doc("公關部").set({"k1": "v1", "k2":"v2"})

    // const doc = await docRef.get();
    // console.log(doc.data())
    // doc.forEach((doc)=>console.log(doc.id))
    // console.log(doc.exists, doc.data())
    // console.log(doc)
    const key:string = "data"
    const ref = await db.collection("Members").get()
    // ref.forEach(async (doc) => {
    //     // clear each department list
    //     const department = doc.data().department
    //     console.log(doc.id, department);
    //     const docRef = db.collection("Cache/Members").doc(department)
    //     await docRef.set({[key]:[]})
    // });
    ref.forEach(async (doc) => {
        // initialize each department list
        const department = doc.data().department
        console.log(doc.id, department);
        const docRef = db.collection("Cache/Members/Department").doc(department)
        await docRef.set({[key]:[]})
    });
    ref.forEach(async (doc)=>{
        // fill each department list
        const department = doc.data().department
        const docRef = db.collection("Cache/Members/Department").doc(department)
        await docRef.update({
            [key]: FieldValue.arrayUnion(doc.data())
        });
    })
    
    // const ref = await db.collection("Cache/Members/Department").get()
    // ref.forEach(doc=>console.log(doc.id))
    // const ref = await db.collection("Cache/Members/Department").where('id', '==', "策展部").get()
    // ref.forEach(doc=>console.log(doc.data()))
    // console.log("ref", ref)
    // console.log(ref.exists, ref.data())
    // await db.collection("Cache/Members/Department").doc(`${tmp.id}`).set(tmp)
}


export {transformMembersByDepartment}