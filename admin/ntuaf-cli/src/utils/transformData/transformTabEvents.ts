
import { db } from '../../init';
import {EVENT_TYPE} from "@leon123858/ntuaf-sdk"
const {FieldValue } = require('firebase-admin/firestore');

const transformTabEvents = async ()=>{
    console.log("transformTabEvents")
    const toDbPath = "/Cache/Events/TabEvents"
    const fromDbPath = "Events"
    const key = "data"
    //? Is that the way we distinguish two different events?
    const ref =  db.collection(toDbPath).doc(EVENT_TYPE.展覽)
    await ref.set({data:[]})
    const res = await db.collection(toDbPath).doc("活動").set({data:[]})
    const collectionRef = await db.collection(fromDbPath).get()
    collectionRef.forEach(async (doc)=>{
        const data = doc.data()
        if (data.type===EVENT_TYPE.展覽){
            await db.collection(toDbPath).doc(EVENT_TYPE.展覽).update({
                //? what is the meaning for different field
                key:FieldValue.arrayUnion({
                    subTab:data.title,
                    title:data.title,
                    date:data.startTime,
                    url:data.title,
                    id:data.id,
                }),
            })
        }else{
            await db.collection(toDbPath).doc("活動").update({
                key:FieldValue.arrayUnion({
                    subTab:data.title,
                    title:data.title,
                    date:data.startTime,
                    url:data.title,
                    id:data.id,
                }),
            })
        }
        
    })
    

}

export {transformTabEvents}