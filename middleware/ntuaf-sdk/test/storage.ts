/**
 * test methods about firebase storage
 */
import { expect } from 'chai';
import { loginForTest, logout, userId } from '../src/utils/auth';
import { uploadImage } from '../src/utils/storage';
import { readFile } from 'fs/promises';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storageInstance } from '../src/utils/initFirebase';

function toArrayBuffer(buffer: Buffer) {
	let ab = new ArrayBuffer(buffer.length);
	let view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return ab as ArrayBuffer;
}

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
	it('Should not upload when not login or no url', async () => {
		const data = await readFile('./test/data/test.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		try {
			await uploadImage(url);
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err).eql('should have url and login when upload image');
		}
		await loginForTest('a0970785699@gmail.com', '000000');
		try {
			await uploadImage('');
			expect(true, 'should be error here').is.false;
		} catch (err) {
			console.log(err);
			expect(err).eql('should have url and login when upload image');
		}
		await logout();
	});
	it('Should not fetch not exist result', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		try {
			await uploadImage('https://127.0.0.1:22');
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err.message).eql('fetch failed');
		}
		await logout();
	});
	it('Should upload image smaller than 25MB', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		const data = await readFile('./test/data/20MB.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		const result = await uploadImage(url, true);
		await logout();
		expect(result).include('http://127.0.0.1:9199');
	});
	it('Should not upload image bigger than 25MB', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		const data = await readFile('./test/data/49MB.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		try {
			await uploadImage(url, true);
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err.code).eql('storage/unauthorized');
		}
		await logout();
	});
	it('Should only upload image into user folder', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		const data = await readFile('./test/data/test.jpg');
		const reference = ref(
			storageInstance,
			`images/${userId()}/${new Date().getTime()}`
		);
		const buffer = toArrayBuffer(data);
		const result = await uploadBytes(reference, buffer, {
			contentType: 'image/jpeg',
		});
		const newUrl = await getDownloadURL(result.ref);
		expect(newUrl).include('http://127.0.0.1:9199');
		try {
			const reference = ref(
				storageInstance,
				`images/${'otherFolder'}/${new Date().getTime()}`
			);
			await uploadBytes(reference, buffer, {
				contentType: 'image/jpeg',
			});
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err.code).eql('storage/unauthorized');
		}
		await logout();
	});
});
