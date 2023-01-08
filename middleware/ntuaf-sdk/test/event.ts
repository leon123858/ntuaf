/**
 * test methods about native event
 */
import { expect } from 'chai';
import { getEvent } from '../src/utils/db/event';
import { loginForTest, logout } from '../src/utils/auth';
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

		await logout();
	});
	it('should update error with wrong/null auth', async () => {
		await loginForTest('a0983906079@gmail.com');

		await logout();
		await loginForTest('test@gmail.com');

		await logout();
	});
	it('should update success by correct wrong input', async () => {
		await loginForTest('a0970785699@gmail.com');

		await logout();
	});
	it('should update error with no id', async () => {
		await loginForTest('a0970785699@gmail.com');

		await logout();
	});
});
