/**
 * test auth operation (除了第三方登入相關)
 */
import { expect } from 'chai';
import {
	loginForTest,
	logout,
	userEmail,
	getMemberInfo,
} from '../src/utils/auth';
import { doc, getDoc } from '@firebase/firestore';
import { dbInstance } from '../src/utils/initFirebase';

describe('test auth operation', function () {
	it('should work for exist user', async () => {
		expect(userEmail()).is.undefined;
		await loginForTest('a0970785699@gmail.com');
		expect(userEmail()).eql('a0970785699@gmail.com');
		await logout();
		expect(userEmail()).is.undefined;
	});
	it('should not work for not exist user', async () => {
		expect(userEmail()).is.undefined;
		try {
			await loginForTest('xxx@gmail.com');
		} catch (err) {
			expect(err).eql('auth/user-not-found');
		}
		expect(userEmail()).is.undefined;
	});
});

describe('test get member info', function () {
	it('should work for exist user when login', async () => {
		await loginForTest('a0970785699@gmail.com');
		expect(await getMemberInfo()).eqls({
			name: '林俊佑',
			admin: ['test0', 'test1', 'test2'],
			department: '策展部',
			job: '組長',
			id: 'a0970785699@gmail.com',
		});
		await logout();
		try {
			await getMemberInfo();
			throw 'should not throw this error';
		} catch (err) {
			expect(err).eql('用戶須先登入');
		}
	});
	it('should not work for not exist user', async () => {
		await loginForTest('test@gmail.com');
		try {
			await getMemberInfo();
			throw 'should not throw this error';
		} catch (err) {
			expect(err).eql('用戶不在成員列表');
		}
		await logout();
	});
	it('should not work for get other info', async () => {
		await loginForTest('a0970785699@gmail.com');
		try {
			await getDoc(doc(dbInstance, 'Members', 'a0983906079@gmail.com'));
			throw 'should not throw this error';
		} catch (err) {
			expect(err.code).eql('permission-denied');
		}
		await logout();
	});
});
