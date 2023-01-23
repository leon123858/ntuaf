const prompts = require('prompts');

const askMode = () =>
	prompts({
		type: 'select',
		name: 'mode',
		message: '想做甚麼?',
		choices: [{ title: '打入測試資料', value: 'insertSample' }],
	});

export { askMode };
