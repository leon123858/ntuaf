/**
 * test methods about native event
 */
import { expect } from 'chai';
import { getEvent, updateEvent } from '../src/utils/db/event';
import { loginForTest, logout, userEmail } from '../src/utils/auth';
import { EVENT_TYPE } from '../src/types/enums';

describe('test get event info', function () {
	it('should get event info by id', async () => {
		const result = await getEvent('test1');
		expect(result).eqls({
			startTime: 123456,
			endTime: 234567,
			place: {
				name: 'test',
				url: 'test',
			},
			image: {
				card: 'test',
				banner: 'test',
			},
			type: EVENT_TYPE.工作坊,
			title: 'test2',
			blocks: [],
		});
	});
	it('should get undefined when not exist', async () => {
		const result = await getEvent('test-1');
		expect(result).is.undefined;
	});
});

describe('test update event', function () {
	it('should update success with right auth', async () => {
		await loginForTest('a0970785699@gmail.com');
		await updateEvent({ id: 'test0', blocks: [{}, {}] } as any);
		expect(await getEvent('test0')).eqls({
			type: '展覽',
			image: { banner: null, card: null },
			blocks: [
				{ text: '', type: 0, title: '', items: [], url: null },
				{ text: '', type: 0, title: '', items: [], url: null },
			],
			startTime: 0,
			endTime: 0,
			place: { name: '待訂', url: null },
			title: '未定義標題',
		});
		await logout();
	});
	it('should update error with wrong/null auth', async () => {
		await loginForTest('a0983906079@gmail.com');
		try {
			await updateEvent({ id: 'test0' } as any);
			throw 'Should Error in this case';
		} catch (err: any) {
			expect('permission-denied').is.eql(err.code);
		}
		await logout();
		await loginForTest('test@gmail.com');
		try {
			await updateEvent({ id: 'test0' } as any);
			throw 'Should Error in this case';
		} catch (err: any) {
			expect('permission-denied').is.eql(err.code);
		}
		await logout();
	});
	xit('should update error with wrong type', async () => {
		await loginForTest('a0970785699@gmail.com');
		await updateEvent({ id: 'test0', blocks: [{}, {}] } as any);
		await logout();
	});
	xit('should update success by correct wrong input(not type)', async () => {
		await loginForTest('a0970785699@gmail.com');

		await logout();
	});
	xit('should update error with no id', async () => {
		await loginForTest('a0970785699@gmail.com');

		await logout();
	});
});
