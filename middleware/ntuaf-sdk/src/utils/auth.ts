import {
	signInWithEmailAndPassword,
	signOut,
	getRedirectResult,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	User,
} from 'firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import { authInstance, dbInstance } from './initFirebase';
import { Member } from '../types/types';

/**
 * 獲取用戶資料, 含管理事件列表,姓名,email,... 等
 * @returns {Member} 用戶資料
 * @example
 * expect(await getMemberInfo()).eqls({
 *		name: '林俊佑',
 *		admin: ['test0', 'test1', 'test2'],
 *		department: '策展部',
 *		job: '組長',
 *		id: 'a0970785699@gmail.com',
 * });
 */
export const getMemberInfo = async () => {
	if (!userId()) throw '用戶須先登入';
	const data = (
		await getDoc(doc(dbInstance, 'Members', userEmail()))
	).data() as Member | undefined;
	if (!data) throw '用戶不在成員列表';
	return { ...data, id: userEmail() } as Member;
};

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
 * @example
 * // 用戶按下登出後
 * await logout()
 */
export const logout = async () => {
	await signOut(authInstance);
};

/**
 * 使用者信箱
 * @return string || undefined
 * @note 未登入狀態回傳 "undefined", 剛開啟程式時調用,可能取得未登入結果其實已登入
 * @example
 * // 當已用 gmail: a0970785699@gmail.com 登入
 * console.log(userEmail()) // a0970785699@gmail.com
 * // 當沒登入
 * console.log(userEmail()) // undefined
 */
export const userEmail = () => {
	return authInstance.currentUser?.email;
};

/**
 * @description 使用者唯一編號
 * @return string || undefined
 * @note 未登入狀態回傳 "undefined", 剛開啟程式時調用,可能取得未登入結果其實已登入
 * @example
 * // 當已用 gmail: a0970785699@gmail.com 登入
 * console.log(userId()) // 某特定唯一編號
 * // 當沒登入
 * console.log(userId()) // undefined
 */
export const userId = () => {
	return authInstance.currentUser?.uid;
};

/**
 * 訂閱登入狀態
 * @param func 函數,每次進入登入狀態後調用
 * @description 常用來抓取上一次進入網頁的登入狀態
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
 * @example
 * // 按下登入後執行
 * await login()
 */
export const login = async () => {
	await signInWithPopup(authInstance, new GoogleAuthProvider());
};

/**
 * 抓取用戶第三方登入結果
 * @returns 用戶信箱
 * @example
 * // 第三方登入流程
 * await login()
 * console.log(await getLoginResult()) // user email
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
