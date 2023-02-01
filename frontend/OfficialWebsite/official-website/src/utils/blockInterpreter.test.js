/* eslint-disable jest/no-conditional-expect */
import BlockInterpreter from './blockInterpreter';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';

test('interpreter should have parameter in constructor', () => {
	new BlockInterpreter([], []);
	try {
		new BlockInterpreter([]);
		throw new Error('Should be error here');
	} catch (err) {
		expect(err.message).not.toBe('Should be error here');
	}
	try {
		new BlockInterpreter();
		throw new Error('Should be error here');
	} catch (err) {
		expect(err.message).not.toBe('Should be error here');
	}
});

test('should translate correct', async () => {
	const sampleBlocks = [
		{
			type: 5,
			text: 'text_d95160cb-2160-49aa-a8a5-7c0ac92941e0',
			url: 'https://10c5f80f-c12b-4668-bb8b-5b0ecb39f176',
			title: 'title_8828b1fa-ada1-4429-89aa-fc97dd945259',
			items: [
				{
					type: '社團',
					url: 'https://a456ae64-093e-4478-8b3c-db385b24217e',
					name: 'name_1737c484-3409-4937-a124-f81d46796367',
				},
				{
					type: '社團',
					url: 'https://3f4a2c1b-6dbb-4dbe-9a44-add7331aa911',
					name: 'name_6e38147b-86b3-468c-8ad2-7252834b6fae',
				},
				{
					type: 0,
					url: 'https://bad1891c-a767-4cff-95f8-ca58d9a0b143',
					name: 'name_20999340-fbc0-4eef-a60c-417d6adef871',
				},
			],
		},
		{
			type: 'IMAGE_C',
			text: 'text_4ceffd42-8500-45f6-80a3-b789a044c9d1',
			url: 'https://b14423d9-1bb1-424e-8a4a-9307b163dfc1',
			title: 'title_d2ad97de-eb88-4c26-b565-b92960f8e861',
			items: [
				{
					type: 1,
					url: 'https://b3e268b9-1dbe-4eaa-86ab-d00a106feb1e',
					name: 'name_ee2203d6-f3c1-40c0-9e7c-de17f2e1212d',
				},
			],
		},
	];
	// const block2element = [];
	// block2element.push()
});

test('should fail for wrong input', () => {});
