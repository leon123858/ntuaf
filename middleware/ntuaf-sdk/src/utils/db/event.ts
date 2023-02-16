import { dbInstance } from '../initFirebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Block, Event, Images, Item, Place } from '../../types/types';
import { BlOCK_TYPE, EVENT_TYPE, ITEM_TYPE } from '../../types/enums';
/**
 * 獲取系統事件詳細資訊
 * @param eventId 事件唯一編號
 * @returns 事件型別, 若事件不存在, 回傳未定義
 * @example
 * await getEvent('eventId')
 */
export const getEvent = async (eventId: string) => {
	const data = (await getDoc(doc(dbInstance, 'Events', eventId))).data() as
		| Event
		| undefined;
	if (!data) return data;
	return correctEvent(data);
};

const correctPlace = (place: Place) => {
	const { name = '待訂', url = null } = place;
	return { name, url };
};

const correctImage = (images: Images) => {
	const { card = null, banner = null } = images;
	return { card, banner };
};

const correctItem = (item: Item) => {
	const { type = ITEM_TYPE.作者, url = null, name = '' } = item;
	if (!Object.values(ITEM_TYPE).includes(type)) throw 'not exist type of item';
	return {
		type: typeof type == 'number' ? type : ITEM_TYPE[type],
		url,
		name,
	} as Item;
};

const correctBlock = (block: Block) => {
	const {
		type = BlOCK_TYPE.TEXT_A,
		text = '',
		url = null,
		title = '',
		items = [],
	} = block;
	if (!Object.values(BlOCK_TYPE).includes(type))
		throw 'not exist type of block';
	return {
		type: typeof type == 'number' ? type : BlOCK_TYPE[type],
		text,
		url,
		title,
		items: items.map((v) => correctItem(v)),
	} as Block;
};

/**
 * 校正事件欄位
 * @param event
 * @returns 校正結果, 去掉錯誤欄位, 補上不完整欄位
 * @example
 * const newEvent = correctEvent(oldEvent)
 */
export const correctEvent = (event: Event) => {
	const {
		startTime = 0,
		endTime = 0,
		place = correctPlace({} as Place),
		image = correctImage({} as Images),
		type = EVENT_TYPE.展覽,
		title = '未定義標題',
		blocks = [],
	} = event;
	if (!Object.values(EVENT_TYPE).includes(type))
		throw 'not exist type of event';
	return {
		startTime,
		endTime,
		place: correctPlace(place),
		image: correctImage(image),
		type,
		title,
		blocks: blocks.map((v) => correctBlock(v)),
	} as Event;
};

/**
 * 更新事件
 * @param event 完整事件資訊, 需包含事件 id
 * @note 若事件不存在, 權限不足皆會對外報錯
 * @example
 * await updateEvent({ id: 'test0', ...someThing });
 */
export const updateEvent = async (event: Event) => {
	const { id } = event;
	if (!id) throw 'should have event id';
	const newEvent = correctEvent(event);
	await updateDoc(doc(dbInstance, 'Events', id), { ...newEvent });
};
