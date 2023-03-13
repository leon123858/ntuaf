const prompts = require('prompts');

enum MODE_TYPE {
	'給予所有權限' = 'insertAllAdmin',
	'增加權限' = 'insertAdmin',
	'刪除權限' = 'removeAdmin',
	'手動匯入人員列表' = 'insertMemberManually',
	'插入測試資料' = 'insertSample',
	'刪除測試資料' = 'deleteSample',
	'更新系統暫存' = 'refreshCache',
	'彙整當日用戶操作' = 'updateUserData',
	'插入例行展覽' = 'createAlwaysEvent',
	'自動匯入人員列表' = 'insertMember',
	'創建空事件' = 'createEmptyEvent',
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
const askMemberEmail = () =>
	prompts({
		type: 'text',
		name: 'memberEmail',
		message: 'What is the e-mail of the member?',
	});
const askMemberName = () =>
	prompts({
		type: 'text',
		name: 'memberName',
		message: 'What is the name of the member?',
	});
const askMemberJob = () =>
	prompts({
		type: 'text',
		name: 'memberJob',
		message: 'What is the job of the member?',
	});
const askMemberDep = () =>
	prompts({
		type: 'text',
		name: 'memberDepartment',
		message: 'What is the department of the member?',
	});
const askEventId = () =>
	prompts({
		type: 'text',
		name: 'eventId',
		message: 'What is the id of the event?',
	});

export {
	askMode,
	askId,
	askMemberEmail,
	askMemberName,
	askMemberJob,
	askMemberDep,
	askEventId,
	MODE_TYPE,
};
