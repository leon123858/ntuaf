import * as admin from 'firebase-admin';
const serviceAccount = require('../key.json');
try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
} catch (err) {}
const db = admin.firestore();

export { db };
