import * as admin from 'firebase-admin';
const serviceAccount = require('../key.json');
try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		storageBucket: 'ntuaf28-dev.appspot.com',
	});
} catch (err) {}
const db = admin.firestore();
const storage = admin.storage();

export { db, storage };
