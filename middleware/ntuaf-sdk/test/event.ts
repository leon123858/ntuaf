/**
 * test methods about native event
 */
import { expect } from 'chai';
import { getEvent, updateEvent } from '../src/utils/db/event';
import { loginForTest, logout } from '../src/utils/auth';
import { EVENT_TYPE, BlOCK_TYPE, ITEM_TYPE } from '../src/types/enums';
import { Block, Item } from '../src/types/types';

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
	it('should update error with wrong type', async () => {
		await loginForTest('a0970785699@gmail.com');
		await updateEvent({
			id: 'test0',
			type: EVENT_TYPE.展覽,
			blocks: [
				{
					type: BlOCK_TYPE.IMAGE_A,
					items: [{ type: ITEM_TYPE.作者 } as Item],
				} as Block,
			],
		} as any);
		try {
			await updateEvent({
				id: 'test0',
				type: 'WRONG TYPE',
				blocks: [
					{
						type: BlOCK_TYPE.IMAGE_A,
						items: [{ type: ITEM_TYPE.作者 } as Item],
					} as Block,
				],
			} as any);
			throw 'Should be type error';
		} catch (err) {
			expect(err).eql('not exist type of event');
		}
		try {
			await updateEvent({
				id: 'test0',
				type: EVENT_TYPE.市集,
				blocks: [{ type: 'WRONG TYPE' } as any],
			} as any);
			throw 'Should be type error';
		} catch (err) {
			expect(err).eql('not exist type of block');
		}
		try {
			await updateEvent({
				id: 'test0',
				type: EVENT_TYPE.開幕式,
				blocks: [
					{
						type: BlOCK_TYPE.IMAGE_A,
						items: [{ type: 'WRONG TYPE' } as any],
					} as Block,
				],
			} as any);
			throw 'Should be type error';
		} catch (err) {
			expect(err).eql('not exist type of item');
		}
		await logout();
	});
	it('should update success by correct wrong input(not type)', async () => {
		await loginForTest('a0970785699@gmail.com');
		await updateEvent({
			id: 'test0',
			type: EVENT_TYPE.展覽,
			blocks: [
				{
					type: BlOCK_TYPE.IMAGE_A,
					items: [{ type: ITEM_TYPE.作者 } as Item],
				} as Block,
			],
		} as any);
		expect(await getEvent('test0')).eqls({
			startTime: 0,
			endTime: 0,
			place: { name: '待訂', url: null },
			image: { card: null, banner: null },
			type: '展覽',
			title: '未定義標題',
			blocks: [
				{
					type: BlOCK_TYPE.IMAGE_A,
					text: '',
					url: null,
					title: '',
					items: [{ type: 0, url: null, name: '' }],
				},
			],
		});
		await updateEvent({
			id: 'test0',
			type: EVENT_TYPE.展覽,
			blocks: [
				{
					type: 'IMAGE_A' as any,
					items: [{ type: '作者' as any } as Item],
				} as Block,
			],
		} as any);
		expect(await getEvent('test0')).eqls({
			startTime: 0,
			endTime: 0,
			place: { name: '待訂', url: null },
			image: { card: null, banner: null },
			type: '展覽',
			title: '未定義標題',
			blocks: [
				{
					type: BlOCK_TYPE.IMAGE_A,
					text: '',
					url: null,
					title: '',
					items: [{ type: 0, url: null, name: '' }],
				},
			],
		});
		await logout();
	});
	it('should update error with no id', async () => {
		await loginForTest('a0970785699@gmail.com');
		try {
			await updateEvent({
				type: EVENT_TYPE.展覽,
				blocks: [
					{
						type: BlOCK_TYPE.IMAGE_A,
						items: [{ type: ITEM_TYPE.作者 } as Item],
					} as Block,
				],
			} as any);
			throw 'Should throw error';
		} catch (err) {
			expect(err).eql('should have event id');
		}
		await logout();
	});
});
