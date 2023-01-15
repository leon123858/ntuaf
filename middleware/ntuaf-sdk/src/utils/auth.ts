import {
	signInWithEmailAndPassword,
	signOut,
	getRedirectResult,
	signInWithRedirect,
	GoogleAuthProvider,
	onAuthStateChanged,
	User,
} from 'firebase/auth';
import { authInstance } from './initFirebase';

/**
 * 測試用登入 production 勿用
 * @param email
 * @param password
 */
export const loginForTest = async (email: string, password = '000000') => {
	try {
		await signInWithEmailAndPassword(authInstance, email, password);
	} catch (err: any) {
		const { code } = err as { code: string };
		throw code;
	}
};

/**
 * 使用者登出
 */
export const logout = async () => {
	await signOut(authInstance);
};

/**
 * 使用者信箱
 * @return string || undefined
 * @note 未登入狀態回傳 "undefined", 剛開啟程式時調用,可能取得未登入結果其實已登入
 */
export const userEmail = () => {
	return authInstance.currentUser?.email;
};

/**
 * @description 使用者唯一編號
 * @return string || undefined
 * @note 未登入狀態回傳 "undefined", 剛開啟程式時調用,可能取得未登入結果其實已登入
 */
export const userId = () => {
	return authInstance.currentUser?.uid;
};

/**
 * 訂閱登入狀態
 * @param func 函數,每次進入登入狀態後調用
 * @example
 * function callback(user){
 * 	console.log(user.uid)
 * }
 * subscriptAuthState(callback)
 */
export const subscriptAuthState = (func: (user: User) => void) => {
	onAuthStateChanged(authInstance, (user) => {
		if (user) {
			func(user);
		}
	});
};

/**
 * 第三方登入
 */
export const login = async () => {
	await signInWithRedirect(authInstance, new GoogleAuthProvider());
};

/**
 * 抓取用戶第三方登入結果
 * @returns 用戶信箱
 */
export const getLoginResult = async () => {
	try {
		const result = await getRedirectResult(authInstance);
		const user = result.user;
		if (!user) {
			throw {
				errorCode: 'no-user',
			};
		}
		return user.email;
	} catch (error) {
		const errorCode = error.code;
		throw errorCode;
	}
};
