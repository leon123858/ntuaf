/**
 * test methods about firebase storage
 */
import { expect } from 'chai';
import { loginForTest, logout } from '../src/utils/auth';
import { uploadImage } from '../src/utils/storage';
import { readFile } from 'fs/promises';

describe('test upload image', function () {
	this.timeout(10 * 1000);
	it('Should upload success for normal png,jpeg when login', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		const data = await readFile('./test/data/test.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		const result = await uploadImage(url);
		await logout();
		expect(result).include('http://127.0.0.1:9199');
	});
});
