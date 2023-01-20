/**
 * test artwork operation
 */
import { expect } from 'chai';
import { loginForTest, logout } from '../src/utils/auth';
import { createArtwork, getArtworkList } from '../src/utils/db/artwork';
import { ARTWORK_TYPE } from '../src/types/enums';
import { readFile } from 'fs/promises';
import { collection, addDoc } from 'firebase/firestore';
import { dbInstance } from '../src/utils/initFirebase';

describe('test artwork create operation', function () {
	this.timeout(3 * 1000);
	it('should create artwork when login and have right parameter', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		const data = await readFile('./test/data/test.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		const result = await createArtwork({
			type: ARTWORK_TYPE.PAINTING,
			name: '王小小',
			url,
			text: '測試文字內容',
		});
		expect(typeof result).eql('string');
		await logout();
	});

	it('should not create artwork when not login', async () => {
		const data = await readFile('./test/data/test.jpg');
		const blob = new Blob([data], { type: 'image/jpeg' });
		const url = URL.createObjectURL(blob);
		try {
			await createArtwork({
				type: ARTWORK_TYPE.PAINTING,
				name: '王小小',
				url,
				text: '測試文字內容',
			});
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err).eql('Should login first');
		}
	});

	it('should not create artwork with wrong parameter', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		try {
			await createArtwork({
				type: ARTWORK_TYPE.PAINTING,
				name: '王小小',
				text: '測試文字內容',
			});
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err).eql('please input image for this type artwork');
		}
		try {
			await createArtwork({
				type: 'WRONG TYPE' as ARTWORK_TYPE,
				name: '王小小',
				text: '測試文字內容',
			});
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err).eql('not exist type of artwork');
		}
		await createArtwork({
			type: ARTWORK_TYPE.PURE_TEXT,
			name: '王小小',
			text: '測試文字內容',
		});
		await logout();
	});

	it('should not create for another user', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		await addDoc(collection(dbInstance, 'Artworks'), {
			email: 'a0970785699@gmail.com',
			like: 0,
			tmpLike: 0,
		} as any);
		try {
			await addDoc(collection(dbInstance, 'Artworks'), {
				email: 'fakemail@gmail.com',
			} as any);
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err.code).eql('permission-denied');
		}
		await logout();
	});

	it('should not create with not allow parameters', async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		await addDoc(collection(dbInstance, 'Artworks'), {
			email: 'a0970785699@gmail.com',
			like: 0,
			tmpLike: 0,
		});
		try {
			await addDoc(collection(dbInstance, 'Artworks'), {
				email: 'a0970785699@gmail.com',
				like: 1000,
				tmpLike: -20,
			});
			expect(true, 'should be error here').is.false;
		} catch (err) {
			expect(err.code).eql('permission-denied');
		}
		await logout();
	});
});

describe('test artwork get operation', function () {
	before(async () => {
		await loginForTest('a0970785699@gmail.com', '000000');
		await Promise.all(
			[...new Array(20)].map((v, i) =>
				createArtwork({
					type: ARTWORK_TYPE.PURE_TEXT,
					name: 'testName' + i,
					text: 'test text' + i,
				})
			)
		);
		await logout();
	});
	it('Should get artwork list success', async () => {
		const firstFetch = await getArtworkList(ARTWORK_TYPE.PURE_TEXT);
		expect(firstFetch.cursor).is.not.null;
		expect(firstFetch.data[0]).includes({
			like: 0,
			type: '純文字組',
			email: 'a0970785699@gmail.com',
			url: null,
			tmpLike: 0,
		});
		expect(typeof firstFetch.data[0].id).eql('string');
		expect(typeof firstFetch.data[0].text).eql('string');
		expect(typeof firstFetch.data[0].name).eql('string');
		const secondFetch = await getArtworkList(
			ARTWORK_TYPE.PURE_TEXT,
			firstFetch.cursor
		);
		expect(secondFetch.cursor).is.not.null;
		expect(secondFetch.data.length).eql(10);
		const finalFetch = await getArtworkList(
			ARTWORK_TYPE.PURE_TEXT,
			secondFetch.cursor
		);
		expect(finalFetch.cursor).is.null;
	});
	it('Should error with wrong artwork type', async () => {
		try {
			await getArtworkList('AAA' as any);
			throw 'should be error here';
		} catch (err) {
			expect(err).eql('not exist type of artwork');
		}
	});
});
