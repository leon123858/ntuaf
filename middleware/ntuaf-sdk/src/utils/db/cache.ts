import { DEPARTMENT } from '../../types/enums';
import { dbInstance } from '../initFirebase';
import { getDoc, doc } from 'firebase/firestore';
import { Images } from '../../types/types';

/**
 * 獲取該部門成員列表
 * @param {DEPARTMENT} departmentName: 參閱文件中的 enum
 * @returns job 是職稱 ex: 部長
 * @example
 * // js
 * await getMembersByDepartment('策展部')
 * // ts
 * await getMembersByDepartment(DEPARTMENT.策展部)
 */
export const getMembersByDepartment = async (departmentName: DEPARTMENT) => {
	if (!Object.values(DEPARTMENT).includes(departmentName))
		throw 'not exist name of DEPARTMENT';
	// ex: Cache/Members/Department/策展部
	const data = (
		await getDoc(doc(dbInstance, 'Cache/Members/Department', departmentName))
	).data() as { data: { name: string; job: string }[] } | undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};

/**
 * 獲取推薦事件列表
 * @param type recent 表示近期列表, always 表示常設展覽
 * @returns
 * @example
 * await getRecommendEvents('recent')
 */
export const getRecommendEvents = async (type: 'recent' | 'always') => {
	// ex: Cache/Events/Recommend/recent
	const data = (
		await getDoc(doc(dbInstance, 'Cache/Events/Recommend', type))
	).data() as
		| { data: { image: Images; text: string; id: string; date: string }[] }
		| undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};

/**
 * 根據日期取得當天展覽與活動
 * @param month
 * @param day
 * @returns
 * @example
 * // 獲取 5,5 號的事件列表
 * await getDayEvents(5,5)
 */
export const getDayEvents = async (
	month: number | string,
	day: number | string
) => {
	// ex: Cache/Events/DayEvents/4_4
	const data = (
		await getDoc(doc(dbInstance, 'Cache/Events/DayEvents', `${month}_${day}`))
	).data() as
		| {
				data: {
					activity: { name: string; info: string; id: string }[];
					exhibition: { name: string; info: string; id: string }[];
				};
		  }
		| undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};

/**
 * 取得該大類的事件介紹
 * @param tabName
 * @returns
 * @example
 * await getTabEvents('展覽')
 */
export const getTabEvents = async (tabName: '展覽' | '活動') => {
	// ex: Cache/Events/TabEvents/展覽
	const data = (
		await getDoc(doc(dbInstance, 'Cache/Events/TabEvents', tabName))
	).data() as
		| {
				data: {
					subTab: string;
					title: string;
					date: string;
					url: string;
					id: string;
				}[];
		  }
		| undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};
