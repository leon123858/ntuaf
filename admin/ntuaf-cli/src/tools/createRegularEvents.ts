import { db } from '../init';
import moment from "moment"

const createAlwaysEvent = async ()=>{
    //regularEventIdList must be filled manually from Events collection
    const regularEventIdList = ["(test)_1cdc6a06-ad3c-4a7b-a552-d0cc321f144b", "(test)_779faf3b-62f7-4b15-930b-ca8672351825"
    , "(test)_6eb359d1-8e9f-4352-af07-922f2376b299"
]
    try{
        regularEventIdList.forEach(async (eventId)=>{
            const eventRef = await db.collection("Events").doc(eventId).get()
            await db.collection("Cache/RegularEvents/Events").doc(eventId).set({data:eventRef.data()})
        })
    }catch(e){
        console.log("HINT: regularEventIdList need to be refresh")
    }
    
}