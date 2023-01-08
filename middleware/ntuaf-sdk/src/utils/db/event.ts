import { dbInstance } from '../initFirebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Event } from '../../types/types';

/**
 * 獲取系統事件詳細資訊
 * @param eventId 事件唯一編號
 * @returns 事件型別, 若事件不存在, 回傳未定義
 */
export const getEvent = async (eventId: string) => {
	return (await getDoc(doc(dbInstance, 'Events', eventId))).data() as
		| Event
		| undefined;
};

/**
 * 校正事件欄位
 * @param event
 * @returns 校正結果
 */
const correctEvent = (event: Event) => {
	return {} as any;
};

/**
 * 更新事件
 * @param event 完整事件資訊, 需包含事件 id
 * @note 若事件不存在, 權限不足皆會對外報錯
 */
export const updateEvent = async (event: Event) => {
	const { id } = event;
	if (!id) throw 'should have event id';
	const newEvent = correctEvent(event);
	await updateDoc(doc(dbInstance, 'Events', id), newEvent);
};
