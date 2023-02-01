const prompts = require('prompts');

enum MODE_TYPE {
	'插入測試資料' = 'insertSample',
	"刪除測試資料" = "",
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

const askEnv = () =>
	prompts({
		type: 'select',
		name: 'env',
		message: '什麼環境?',
		choices: [{
			title:"development",
			value:"dev"
		},
		{
			title:"production",
			value:"prod"
		}],
	});
	
const askAction = ()=>{
	prompts({
		type: 'select',
		name: 'action',
		message: 'what action to do?',
		choices: [{
			title:"insert",
			value:"insert"
		},
		{
			title:"delete",
			value:"delete"
		}],
	});
}
export { askMode, askEnv, askAction, MODE_TYPE };
