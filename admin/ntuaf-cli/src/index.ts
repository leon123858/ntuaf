#! /usr/bin/env node
import { assert } from 'console';
import { Command } from 'commander';
import { insertSample } from './utils/insertSample';
import { askMode, MODE_TYPE } from './utils/prompts';
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
		case MODE_TYPE.插入測試資料:
			await insertSample();
			break;
		default:
			console.log('未選擇');
			break;
	}
})();
