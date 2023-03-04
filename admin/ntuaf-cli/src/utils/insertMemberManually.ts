import { db } from '../init';


const insertMemberManually = async (email:string, name:string, job:string, department:string) =>{
    console.log(email, name, job, department)
    const member = {
        id:email,
        name,
        job,
        department,
        admin:[]
    }
    await db.collection('Members').doc(`${member.id}`).set(member);
}
export {insertMemberManually}