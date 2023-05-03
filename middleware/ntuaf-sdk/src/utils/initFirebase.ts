import * as app from 'firebase/app';
import { FIREBASE_CONFIG, APP_CHECK_KEY } from '../types/const';
// Optionally import the services that you want to use
import * as auth from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
// import * as appCheckKit from 'firebase/app-check';
// Initialize Firebase
const appInstance = app.initializeApp(FIREBASE_CONFIG);
const dbInstance = firestore.getFirestore();
const authInstance = auth.getAuth();
const storageInstance = storage.getStorage();

// if (typeof process !== 'object') {
// 	appCheckKit.initializeAppCheck(appInstance, {
// 		provider: new appCheckKit.ReCaptchaV3Provider(APP_CHECK_KEY),
// 		// Optional argument. If true, the SDK automatically refreshes App Check
// 		// tokens as needed.
// 		isTokenAutoRefreshEnabled: true,
// 	});
// }

export { appInstance, dbInstance, authInstance, storageInstance };
