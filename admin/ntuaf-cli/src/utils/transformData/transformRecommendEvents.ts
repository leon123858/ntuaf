import { db } from '../../init';
import moment from "moment"
const { FieldValue } = require('firebase-admin/firestore');

const transformRegularEvent = async ()=>{
    const toDbPath = "Cache/Events/Recommend"
    const fromDbPath = "Cache/RegularEvents/Events"
    const id:string = "always"
    const key:string = "data"
    const ref = await db.collection(fromDbPath).get()
    //info for regular events: transform Cache/RegularEvents/Events document to Cache/Events/Recommend
    ref.forEach(async (doc) => {
        // initialize each list
        const docRef = db.collection(toDbPath).doc(id)
        await docRef.set({[key]:[]})
    });
    ref.forEach(async (doc)=>{
        // fill each list
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
    const id:string = "recent"
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
        // initialize each list
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

export {transformRecommendEvents}
