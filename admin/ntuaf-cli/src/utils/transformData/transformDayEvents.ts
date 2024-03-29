import { db } from '../../init';
import moment from 'moment';
const { FieldValue } = require('firebase-admin/firestore');

import { EVENT_TYPE } from '@leon123858/ntuaf-sdk';

const createTimeString = (start: number, end: number) => {
	if (moment(start).isSame(moment(end), 'day')) {
		return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
	}
	return `${moment(start).format('MM/DD')} - ${moment(end).format('MM/DD')}`;
};

const transformDayEvents = async () => {
	const monthEvent = { '4': {}, '5': {} } as any;
	const toDbPath = 'Cache/Events/DayEvents';
	const afStart = moment('04/20/2023', 'MM/DD/YYYY');
	const afEnd = moment('05/30/2023', 'MM/DD/YYYY');
	const key = 'data';
	const handleDay = afStart.clone();
	//info create bucket aka empty list
	for (let i = 0; ; ) {
		// initialize document
		const id = handleDay.format('M_D');
		await db
			.collection(toDbPath)
			.doc(id)
			.set({
				[key]: {
					activity: [],
					exhibition: [],
					workshop: [],
				},
			});
		handleDay.add(1, 'days');
		if (handleDay > afEnd) {
			break;
		}
	}
	//info distribute event to corresponding bucket based on their own period
	const eventRef = await db.collection('Events').get();
	let countL = 0;
	await Promise.all(
		eventRef.docs.map(async (doc) => {
			const data = doc.data();
			const startTime = moment(data.startTime, 'x');
			const endTime = moment(data.endTime, 'x');
			const handleTime = startTime.clone();
			for (; ; countL++) {
				const id = handleTime.format('M_D');
				const month = handleTime.format('M');
				const eventType = data.type;
				if (monthEvent[month] == undefined) {
					monthEvent[month] = {};
				}
				if (monthEvent[month][id] == undefined) {
					monthEvent[month][id] = [false, false, false];
				}
				switch (eventType) {
					case EVENT_TYPE.展覽:
						monthEvent[month][id][2] = true;
						break;
					case EVENT_TYPE['講座/工作坊']:
					case EVENT_TYPE.工作坊:
					case EVENT_TYPE.講座:
						monthEvent[month][id][1] = true;
						break;
					default:
						monthEvent[month][id][0] = true;
						break;
				}
				// console.log(countL, startTime.format("M/D"), endTime.format("M/D"), startTime.valueOf(),handleTime.valueOf(), endTime.valueOf(),  data.id)
				if (eventType === EVENT_TYPE.展覽) {
					await db
						.collection(toDbPath)
						.doc(id)
						.update({
							'data.exhibition': FieldValue.arrayUnion({
								name: data.title,
								info: `${createTimeString(data.startTime, data.endTime)} | ${
									data.place.name
								}`,
								id: data.id,
							}),
						});
				} else if (
					eventType === EVENT_TYPE.講座 ||
					eventType === EVENT_TYPE.工作坊 ||
					eventType === EVENT_TYPE['講座/工作坊']
				) {
					await db
						.collection(toDbPath)
						.doc(id)
						.update({
							'data.workshop': FieldValue.arrayUnion({
								name: data.title,
								info: `${createTimeString(data.startTime, data.endTime)} | ${
									data.place.name
								}`,
								id: data.id,
							}),
						});
				} else {
					await db
						.collection(toDbPath)
						.doc(id)
						.update({
							'data.activity': FieldValue.arrayUnion({
								name: data.title,
								info: `${createTimeString(data.startTime, data.endTime)} | ${
									data.place.name
								}`,
								id: data.id,
							}),
						});
				}
				handleTime.add(1, 'days');
				// console.log(handleTime.valueOf())
				if (handleTime.valueOf() >= endTime.valueOf()) {
					break;
				}
			}
		})
	);
	await db
		.collection('Cache/Events/MonthEvents')
		.doc('4')
		.set({
			data: {
				...monthEvent['4'],
			},
		});
	await db
		.collection('Cache/Events/MonthEvents')
		.doc('5')
		.set({
			data: {
				...monthEvent['5'],
			},
		});
	console.log('transformDayEvents OK!');
};

export { transformDayEvents };
