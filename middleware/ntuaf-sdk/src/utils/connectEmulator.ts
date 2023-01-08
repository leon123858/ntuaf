import * as firebaseInstance from './initFirebase';

import { connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator } from 'firebase/storage';
import { connectFirestoreEmulator } from 'firebase/firestore';

export const connectEmulator = () => {
	connectAuthEmulator(firebaseInstance.authInstance, 'http://localhost:9099');
	connectFirestoreEmulator(firebaseInstance.dbInstance, 'localhost', 8080);
	connectStorageEmulator(firebaseInstance.storageInstance, 'localhost', 9199);
};
