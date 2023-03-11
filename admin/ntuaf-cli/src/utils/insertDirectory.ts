
import csv from "csv-parser"
import { db } from '../init';
import fs from "fs"
const path = require('path');
const cliProgress = require('cli-progress');


const insertDirectory = async ()=>{
    // const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	// bar.start(1, 0);
    //read csv file
    console.log("insertDirectory")
    let memberList:any = [];
    fs.createReadStream(path.resolve(__dirname, '../../src/data/directory.csv'))
    .pipe(csv({ headers:["email","name","job","department"]}))
    .on('data', (data) => {
        const member = {
            id: data["email"],
			name: data["name"],
			job: data["job"],
			department: data["department"],
            admin:[]
        }
        console.log(member)
        db.collection('Members').doc(`${member.id}`).set(member);
    })
    .on('end', () => {
    });
    
	// bar.increment(1);
	// bar.stop();
}

export {insertDirectory}

