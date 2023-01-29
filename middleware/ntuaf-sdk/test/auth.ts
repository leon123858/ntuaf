/**
 * test auth operation (除了第三方登入相關)
 */
import { expect } from 'chai';
import { loginForTest, logout, userEmail } from '../src/utils/auth';

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
