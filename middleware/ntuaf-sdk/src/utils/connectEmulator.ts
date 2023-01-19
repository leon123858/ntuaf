import * as firebaseInstance from './initFirebase';

import { connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator } from 'firebase/storage';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const connectEmulator = () => {
	connectAuthEmulator(firebaseInstance.authInstance, 'http://127.0.0.1:9099');
	connectFirestoreEmulator(firebaseInstance.dbInstance, '127.0.0.1', 8080);
	connectStorageEmulator(firebaseInstance.storageInstance, '127.0.0.1', 9199);
};
