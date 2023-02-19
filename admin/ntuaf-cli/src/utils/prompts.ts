const prompts = require('prompts');

enum MODE_TYPE {
	'插入測試資料' = 'insertSample',
	'刪除測試資料' = 'deleteSample',
	'更新系統暫存' = 'refreshCache',
	'彙整當日用戶操作' = 'updateUserData',
	'插入例行展覽' = 'createAlwaysEvent',
}

const modeChoices = Object.keys(MODE_TYPE).map((key) => {
	return {
		title: key,
		value: MODE_TYPE[key as keyof typeof MODE_TYPE],
	};
});

const askMode = () =>
	prompts({
		type: 'select',
		name: 'mode',
		message: '想做甚麼?',
		choices: modeChoices,
	});

const askId = () =>
	prompts({
		type: 'text',
		name: 'id',
		message: 'What is the id of target?',
	});

export { askMode, askId, MODE_TYPE };
