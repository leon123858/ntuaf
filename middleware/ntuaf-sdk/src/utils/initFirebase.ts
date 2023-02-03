import * as app from 'firebase/app';
import { FIREBASE_CONFIG } from '../types/const';
// Optionally import the services that you want to use
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';

// Initialize Firebase
const appInstance = app.initializeApp(FIREBASE_CONFIG);
const dbInstance = firestore.getFirestore();
const authInstance = auth.getAuth();
const storageInstance = storage.getStorage();

export { appInstance, dbInstance, authInstance, storageInstance };
