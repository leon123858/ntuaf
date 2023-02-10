import { db } from '../init';
import moment from "moment"
const {FieldValue } = require('firebase-admin/firestore');

import {DEPARTMENT, Artwork, ARTWORK_TYPE, Event, Place, Images, EVENT_TYPE, Block, BlOCK_TYPE, ITEM_TYPE, Item} from "@leon123858/ntuaf-sdk"
import { initializeApp } from 'firebase-admin';

const transformDayEvents = async ()=>{
    const toDbPath = "Cache/Events/DayEvents"
    const afStart = moment('04/20/2023', 'MM/DD/YYYY')
	const afEnd = moment('05/20/2023', 'MM/DD/YYYY')
    const key = "data"
    const handleDay = afStart.clone()
    for (let i=0;;){
        // initialize document
        const id = handleDay.format("M_D")
        await db.collection(toDbPath).doc(id).set({[key]:{
            activity:[],
            exhibition:[]
        }})
        handleDay.add(1, "days")
        if (handleDay>afEnd){
            break
        }
    }
    //info distribute event to 
    const eventRef = await db.collection("Events").get()
    const event:any = {
        activity: [] as any[],
        exhibition: [] as any[]
    }
    eventRef.forEach(async (doc)=>{
        const data = doc.data()
        const startTime = moment(data.startTime, "x")
        const endTime = moment(data.endTime, "x")
        console.log(startTime.format("M/D"), endTime.format("M/D"), data.id)
        const handleTime = startTime.clone()
        for (;;){
            const id = handleTime.format("M_D")
            if (data.type===EVENT_TYPE.展覽){
                await db.collection(toDbPath).doc(id).set({[key]:{
                    activity:FieldValue.arrayUnion({name:data.title, info:data.title, id:data.id}),
                }})
            }else{
                await db.collection(toDbPath).doc(id).set({[key]:{
                    exhibition:FieldValue.arrayUnion({name:data.title, info:data.title, id:data.id}),
                }})
            }
            handleDay.add(1, "days")
            if (handleDay.valueOf()>=endTime.valueOf()){
                break
            }
        }
    })

}

const createAlwaysEvent = async ()=>{
    //regularEventIdList must be filled manually from Events collection
    const regularEventIdList = ["(test)_00f87359-d8a1-4f4f-8725-f701b050e872", "(test)_04b6ef4b-f3e1-4e34-a16c-ce6c668c395d", "(test)_0a26759c-6a4f-43ba-83f0-38d9f7723f33"]
    try{
        regularEventIdList.forEach(async (eventId)=>{
            const eventRef = await db.collection("Events").doc(eventId).get()
            await db.collection("Cache/RegularEvents/Events").doc(eventId).set({data:eventRef.data()})
        })
    }catch(e){
        console.log("HINT: regularEventIdList need to be refresh")
    }
    
}
const transformRegularEvent = async ()=>{
    const toDbPath = "Cache/Events/Recommend"
    const fromDbPath = "Cache/RegularEvents/Events"
    const id:string = "always"
    const key:string = "data"
    const ref = await db.collection(fromDbPath).get()
    //info for regular events: transform Cache/RegularEvents/Events document to Cache/Events/Recommend
    ref.forEach(async (doc) => {
        // initialize each department list
        const docRef = db.collection(toDbPath).doc(id)
        await docRef.set({[key]:[]})
    });
    ref.forEach(async (doc)=>{
        // fill each department list
        const docRef = db.collection(toDbPath).doc(id)
        await docRef.update({
            //? what is image and text for an event
            [key]: FieldValue.arrayUnion({image:doc.data().data.image, text:doc.data().data.title, id:doc.data().data.id})
        });
    })
}
const transformRecentEvent = async ()=>{
    // info for recent events: use the start time of event to judge if it upcoming events
    // info the definition of recent event: the event haven't start or we're in the period of event 
    const fromDbPath = "Events"
    const toDbPath = "Cache/Events/Recommend"
    const id:string = "always"
    const key:string = "data"
    const ref = await db.collection(fromDbPath).get()
    const event: {[k: string]: any} = {};
    ref.forEach((doc)=>{
        event[doc.data().startTime] = doc.data()
    })
    const orderedKey = Object.keys(event).sort()
    const currentTimeStamp = moment().valueOf()
    const recentEvents = orderedKey.map((startTime)=>{
        if((parseInt(startTime)>currentTimeStamp) || (parseInt(startTime)<currentTimeStamp && currentTimeStamp<event[startTime].endTime)){
            //? what is image and text for an event
            return {image:event[startTime].image, text:event[startTime].title, id:event[startTime].id}
        }
    })
    ref.forEach(async (doc) => {
        // initialize each department list
        const docRef = db.collection(toDbPath).doc(id)
        await docRef.set({[key]:[]})
    });
    await db.collection(toDbPath).doc(id).set({[key]:recentEvents})

}
const transformRecommendEvents = async() => {
    console.log("transformRecommendEvents")
    transformRegularEvent()
    transformRecentEvent()
}



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
    
    // const ref = await db.collection("Cache/Members/Department").get()
    // ref.forEach(doc=>console.log(doc.id))
    // const ref = await db.collection("Cache/Members/Department").where('id', '==', "策展部").get()
    // ref.forEach(doc=>console.log(doc.data()))
    // console.log("ref", ref)
    // console.log(ref.exists, ref.data())
    // await db.collection("Cache/Members/Department").doc(`${tmp.id}`).set(tmp)
}



export {transformMembersByDepartment, transformRecommendEvents, createAlwaysEvent, transformDayEvents}