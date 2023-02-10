import { db } from '../init';
import moment from "moment"
import {Member, DEPARTMENT, Artwork, ARTWORK_TYPE, Event, Place, Images, EVENT_TYPE, Block, BlOCK_TYPE, ITEM_TYPE, Item} from "@leon123858/ntuaf-sdk"
const {v4: uuidv4} = require('uuid');
const cliProgress = require('cli-progress');

const insertMember = async () => {
	console.log("inserting Members sample data")
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
	const numOfNewDoc = 10
	for(let i=0; i<numOfNewDoc; i++){
		const departList = Object.keys(DEPARTMENT).map((key) => DEPARTMENT[key as keyof typeof DEPARTMENT])
		const maxLengthOfAdmin = 5
		const member:Member = {
			id: "(test)_"+uuidv4()+"@gmail.com",
			name:"name_"+uuidv4(),
			job:"job_"+uuidv4(),
			department: departList[Math.floor(Math.random()*departList.length)],
			admin: Array.from({length: Math.random()*maxLengthOfAdmin}, () => uuidv4())
		}
		const res = await db.collection("Members").doc(`${member.id}`).set(member)
	}
	bar.increment(1);
	bar.stop();
};

const insertArtWork = async ()=>{
	console.log("inserting ArtWorks sample data")
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
	const numOfNewDoc = 10
	for(let i=0; i<numOfNewDoc; i++){
		const typeList = Object.keys(ARTWORK_TYPE).map((key) => ARTWORK_TYPE[key as keyof typeof ARTWORK_TYPE])
		const createTimeMax = 100
		const likeMax = 1000
		const tmpLiktMax = 1000
		const artWork:Artwork = {
			id:"(test)_"+uuidv4(),
			type:typeList[Math.floor(Math.random()*typeList.length)],
			name:"name_"+uuidv4(),
			email:"email_"+uuidv4(),
			url:"https://"+uuidv4(),
			text:"text_"+uuidv4(),
			createTime:Math.floor(Math.random()*createTimeMax),
			like: Math.floor(Math.random()*likeMax),
			tmpLike:Math.floor(Math.random()*tmpLiktMax),
		}
		const res = await db.collection("ArtWorks").doc(`${artWork.id}`).set(artWork)
	}
	bar.increment(1);
	bar.stop();
}
const insertEvent = async ()=>{
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
	const numOfNewDoc = 10
	const afStart = moment('2023/04/20', 'YYYY/MM/DD')
	const afEnd = moment('2023/05/20', 'YYYY/MM/DD')
	const afPeriod = afEnd.diff(afStart, "days")

	for(let i=0; i<numOfNewDoc; i++){
		const currentDay = afStart.clone()
		const typeList = Object.keys(EVENT_TYPE).map((key) => EVENT_TYPE[key as keyof typeof EVENT_TYPE])
		const startOffset = Math.floor(Math.random()*afPeriod)
		const endOffest = Math.floor((Math.random()*(afPeriod-startOffset)))+1
		const startTime =  currentDay.add(startOffset, "days").valueOf()
		const endTime = currentDay.add(endOffest, "days").valueOf()

		const place:Place = {
			name:"name_"+uuidv4(),
			url:"https://"+ uuidv4(), 
		}


		const blockListMaxLength = 3
		const createBlockList = ()=>{
			return Array.from({length: Math.random()*blockListMaxLength}, () => {
				const blockTypeList = Object.values(BlOCK_TYPE)
				.filter((v) => !isNaN(Number(v)))
				.map((key) => BlOCK_TYPE[key as keyof typeof BlOCK_TYPE])

				const itemTypeList = Object.values(ITEM_TYPE)
				.filter((v) => !isNaN(Number(v)))
				.map((key) => ITEM_TYPE[key as keyof typeof ITEM_TYPE])

				const maxLengthOfItem = 5
				const block:Block = {
					type: blockTypeList[Math.floor(Math.random()*blockTypeList.length)],
					text: "text_"+uuidv4(),
					url: "https://"+uuidv4(),
					title: "title_"+uuidv4(),
					items: Array.from({length: Math.random()*maxLengthOfItem}, () => {
						const item:Item = {
							type: itemTypeList[Math.floor(Math.random()*itemTypeList.length)],
							url: "https://"+uuidv4(),
							name: "name_"+uuidv4(),
						}
						return item
					})
					
				}
				return block
			})
		}
		const image:Images = {
			card: uuidv4(),
			banner: uuidv4()
		}

		const event:Event = {
			id: "(test)_"+uuidv4(),
			startTime: startTime,
			endTime: endTime, 
			place: place,
			image: image,
			type:typeList[Math.floor(Math.random()*typeList.length)],
			title:"title_"+uuidv4(),
			blocks: createBlockList()
		}
		const res = await db.collection("Events").doc(`${event.id}`).set(event)
		bar.increment(1);
		bar.stop();
	}
}

export { insertMember, insertArtWork, insertEvent };
