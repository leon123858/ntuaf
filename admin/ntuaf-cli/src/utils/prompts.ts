const prompts = require('prompts');

enum MODE_TYPE {
	'插入測試資料' = 'insertSample',
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

export { askMode, MODE_TYPE };
