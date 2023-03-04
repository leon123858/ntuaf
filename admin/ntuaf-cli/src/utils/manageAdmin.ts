import { db } from '../init';


const insertAdmin = async (email:string, eventId:string) =>{

    const docRef =  db.collection('Members').doc(`${email}`);
    const data = (await docRef.get())
    if (!data.exists){
        console.log("wrong email:", email)
        return
    }
    const adminList = data.get("admin")
    console.log(adminList)
    //todo go to event collection to check if event id exist
    if (adminList.includes(eventId)){
        return 
    }
    adminList.push(eventId)
    const member = {
        id:data.get("id"),
        name: data.get("name"),
        job: data.get("job"),
        department: data.get("department"),
        admin: adminList,
    }
    await docRef.update(member)

}
const removeAdmin = async (email:string, eventId:string) =>{
    
    const docRef =  db.collection('Members').doc(`${email}`);
    const data = (await docRef.get())
    if (!data.exists){
        console.log("wrong email:", email)
        return
    }
    let adminList = data.get("admin")
    console.log(adminList)
    if (adminList.includes(eventId)){
        adminList = adminList.filter((e:string)=>e!==eventId)
        const member = {
            id:data.get("id"),
            name: data.get("name"),
            job: data.get("job"),
            department: data.get("department"),
            admin: adminList,
        }
        await docRef.update(member)
    }else{
        console.log("no event id:", eventId, " for ", email)
    }
}
export {insertAdmin, removeAdmin}