import { db } from '../init';
import fs from 'fs/promises';

/**
 * 備份
 * @param names 要備份的 collection name
 */
const backupCollections = async (names: string[]) => {
	await fs.mkdir('./backup', { recursive: true });
	names.forEach(async (name) => {
		const data = (await db.collection(name).get()).docs.map((doc) => {
			return {
				__id: doc.id,
				...doc.data(),
			};
		});
		await fs.writeFile(`./backup/${name}.json`, JSON.stringify(data));
	});
};

export { backupCollections };
