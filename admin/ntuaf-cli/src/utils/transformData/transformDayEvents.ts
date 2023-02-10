import { db } from '../../init';
import moment from "moment"
const {FieldValue } = require('firebase-admin/firestore');

import {EVENT_TYPE} from "@leon123858/ntuaf-sdk"

const transformDayEvents = async ()=>{
    const toDbPath = "Cache/Events/DayEvents"
    const afStart = moment('04/20/2023', 'MM/DD/YYYY')
	const afEnd = moment('05/20/2023', 'MM/DD/YYYY')
    const key = "data"
    const handleDay = afStart.clone()
    //info create bucket aka empty list
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
    //info distribute event to corresponding bucket based on their own period
    const eventRef = await db.collection("Events").get()
    const event:any = {
        activity: [] as any[],
        exhibition: [] as any[]
    }
    let countL = 0
    eventRef.forEach(async (doc)=>{
        const data = doc.data()
        const startTime = moment(data.startTime, "x")
        const endTime = moment(data.endTime, "x")
        const handleTime = startTime.clone()
        for (;;countL++){
            const id = handleTime.format("M_D")
            // console.log(countL, startTime.format("M/D"), endTime.format("M/D"), startTime.valueOf(),handleTime.valueOf(), endTime.valueOf(),  data.id)
            if (data.type===EVENT_TYPE.展覽){
                await db.collection(toDbPath).doc(id).update({
                    "data.activity":FieldValue.arrayUnion({name:data.title, info:data.title, id:data.id}),
                })
            }else{
                await db.collection(toDbPath).doc(id).update({
                    "data.exhibition":FieldValue.arrayUnion({name:data.title, info:data.title, id:data.id}),
                })
            }
            handleTime.add(1, "days")
            // console.log(handleTime.valueOf())
            if (handleTime.valueOf()>=endTime.valueOf()){
                break
            }
            
        }
    })

}




export {transformDayEvents}