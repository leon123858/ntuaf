const { assert } = require('console');
const { Command } = require('commander');
const { insertSample } = require('./utils/insertSample');
const { askMode } = require('./utils/prompts');
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
	if (options.mode) {
		if (['insertSample'].includes(options.mode)) {
			await insertSample();
			return;
		}
		console.log('不允許使用自動化指令行的模式');
		return;
	}
	const mode = (await askMode()).mode;
	switch (mode) {
		case 'insertSample':
			await insertSample();
			break;
		default:
			console.log('未選擇');
			break;
	}
})();
