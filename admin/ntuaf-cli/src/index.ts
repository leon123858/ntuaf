#! /usr/bin/env node
import { Socket } from 'net';
import { assert } from 'console';
import { Command } from 'commander';
import { insertMember, insertArtwork, insertEvent } from './utils/insertSample';
import { deleteCollection } from './utils/deleteSample';
import {
	askMode,
	MODE_TYPE,
	askId,
	askMemberEmail,
	askMemberName,
	askMemberJob,
	askMemberDep,
	askEventId,
} from './utils/prompts';
import {
	transformMembers,
	transformRecommendEvents,
	transformDayEvents,
	transformTabEvents,
} from './utils/transformData/index';
import { createAlwaysEvent } from './tools/createRegularEvents';
import {
	// createFakeTmpData,
	deleteAllUserTmpData,
	updateArtworkLike,
	setAllTmpDataAsInit,
} from './utils/updateUserData';
import { insertDirectory } from './utils/insertDirectory';
import { insertMemberManually } from './utils/insertMemberManually';
import { insertAdmin, removeAdmin } from './utils/manageAdmin';
const { v4: uuidv4 } = require('uuid');
import { db } from './init';
import { EVENT_TYPE, Event } from '@leon123858/ntuaf-sdk';
import moment from 'moment';

const figlet = require('figlet');

const program = new Command();
console.log(figlet.textSync('NTUAF CLI'));

program
	.version('1.0.0')
	.description('An CLI interface for ntuaf')
	.option('-m, --mode  [value]', '直接執行某行為')
	.option('-d, --dev', '是否連接模擬器')
	.parse(process.argv);

const options = program.opts();

(async function () {
	// 確認測試模式連線本地模擬器
	if (options.dev) {
		console.log('connect to local enumerator');
		const isEnvSet = process.env.FIRESTORE_EMULATOR_HOST === '127.0.0.1:8080';
		assert(
			isEnvSet,
			'use export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 in your terminal'
		);
		if (!isEnvSet) {
			return 1;
		}
		if (!(await isPortReachable(8080, { host: '127.0.0.1' }))) {
			console.error(
				"Should use 'yarn enumerate' to start a enumerate local for testing"
			);
			return 1;
		}
	}
	// 是否為允許的可自動化執行模式
	if (options.mode) {
		const allowModes = [MODE_TYPE.插入測試資料];
		if (!allowModes.includes(options.mode)) {
			console.log('不允許使用自動化指令行的參數');
			console.log('僅允許下列參數');
			allowModes.forEach((v, i) => {
				console.log(`${i + 1}. ${v}`);
			});
			return;
		}
	}
	const mode: MODE_TYPE = options.mode || (await askMode()).mode;

	switch (mode) {
		case MODE_TYPE.插入測試資料: {
			// await insertMember();
			await insertArtwork();
			await insertEvent();
			break;
		}
		case MODE_TYPE.創建空事件: {
			const afStart = moment('2023/04/20', 'YYYY/MM/DD');
			const afEnd = moment('2023/05/20', 'YYYY/MM/DD');
			const afPeriod = afEnd.diff(afStart, 'days');
			const startOffset = Math.floor(Math.random() * afPeriod);
			const endOffest =
				Math.floor(Math.random() * (afPeriod - startOffset)) + 1;
			const currentDay = afStart.clone();
			const startTime = currentDay.add(startOffset, 'days').valueOf();
			const endTime = currentDay.add(endOffest, 'days').valueOf();
			const event: Event = {
				id: uuidv4(),
				startTime,
				endTime,
				place: { name: '', url: '' },
				image: { card: '', banner: '' },
				type: EVENT_TYPE.展覽,
				title: '新事件',
				blocks: [],
			};
			await db.collection('Events').doc(`${event.id}`).set(event);
			break;
		}
		case MODE_TYPE.刪除測試資料: {
			// const o = (await askEnv()).env;
			// console.log(o)
			// await deleteCollection('Members');
			await deleteCollection('Events');
			await deleteCollection('Artworks');
			break;
		}
		case MODE_TYPE.更新系統暫存: {
			await transformMembers();
			await transformRecommendEvents();
			await transformDayEvents();
			await transformTabEvents();
			break;
		}
		case MODE_TYPE.彙整當日用戶操作: {
			// await createFakeTmpData();
			await updateArtworkLike();
			await deleteAllUserTmpData();
			await setAllTmpDataAsInit();
			break;
		}
		case MODE_TYPE.插入例行展覽: {
			const id = (await askId()).id;
			await createAlwaysEvent(id);
			break;
		}
		case MODE_TYPE.自動匯入人員列表: {
			await insertDirectory();
			break;
		}
		case MODE_TYPE.手動匯入人員列表: {
			const email = (await askMemberEmail()).memberEmail;
			const name = (await askMemberName()).memberName;
			const job = (await askMemberJob()).memberJob;
			const department = (await askMemberDep()).memberDepartment;
			await insertMemberManually(email, name, job, department);
			break;
		}
		case MODE_TYPE.增加權限: {
			const email = (await askMemberEmail()).memberEmail;
			const eventId = (await askEventId()).eventId;
			await insertAdmin(email, eventId);
			break;
		}
		case MODE_TYPE.刪除權限: {
			const email = (await askMemberEmail()).memberEmail;
			const eventId = (await askEventId()).eventId;
			await removeAdmin(email, eventId);
			break;
		}

		default: {
			console.log('未選擇');
			// const allEvent = await db.collection('Events').get();
			// const allEventId = allEvent.docs.map((v) => v.id);
			// await db
			// 	.collection('Members')
			// 	.doc('guanmingchiu@gmail.com')
			// 	.update({ admin: allEventId });
			break;
		}
	}
})();

async function isPortReachable(
	port: number,
	{ host, timeout = 1000 }: { host: string; timeout?: number }
) {
	const promise = new Promise((resolve, reject) => {
		const socket = new Socket();

		const onError = () => {
			socket.destroy();
			reject(1);
		};

		socket.setTimeout(timeout);
		socket.once('error', onError);
		socket.once('timeout', onError);

		socket.connect(port, host, () => {
			socket.end();
			resolve(0);
		});
	});

	try {
		await promise;
		return true;
	} catch {
		return false;
	}
}
