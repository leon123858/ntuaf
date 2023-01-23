import { dbInstance } from '../initFirebase';
import { getDoc, doc } from 'firebase/firestore';

/**
 * 獲取該部門成員列表
 * @param departmentName
 * @returns job 是職稱 ex: 部長
 */
export const getMembersByDepartment = async (departmentName: string) => {
	const data = (
		await getDoc(doc(dbInstance, 'Cache', 'Members', departmentName))
	).data() as { data: { name: string; job: string }[] } | undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};

/**
 * 獲取推薦事件列表
 * @param type recent 表示近期列表, always 表示常設展覽
 * @returns
 */
export const getRecommendEvents = async (type: 'recent' | 'always') => {
	const data = (
		await getDoc(doc(dbInstance, 'Cache', 'Recommend', type))
	).data() as
		| { data: { image: string; text: string; id: string }[] }
		| undefined;
	if (!data) throw 'can not fetch target cache';
	return data.data;
};

/**
 * 根據日期取得當天展覽與活動
 * @param month
 * @param day
 * @returns
 */
export const getDayEvents = async (
	month: number | string,
	day: number | string
) => {
	const data = (
		await getDoc(doc(dbInstance, 'Cache', 'DayEvents', `${month}_${day}`))
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
 */
export const getTabEvents = async (tabName: '展覽' | '活動') => {
	const data = (
		await getDoc(doc(dbInstance, 'Cache', 'TabEvents', tabName))
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
