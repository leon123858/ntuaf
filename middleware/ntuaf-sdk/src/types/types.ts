import * as enums from './enums';

/**
 * 投稿品, 用在行銷活動, 參與者的上傳結果
 * @property id 投稿編號
 * @property type 投稿的活動類別
 * @property name 作者姓名
 * @property artworkName 作品名稱
 * @property email 作者 email
 * @property url 圖片 url
 * @property text 文字內容
 * @property createTime 創建時間
 * @property like 喜歡數
 * @property tmpLike 暫存喜歡數(腳本確認後併入喜歡)
 */
export interface Artwork {
	id?: string;
	type: enums.ARTWORK_TYPE;
	name: string;
	artworkName: string;
	email: string;
	url: string;
	text: string;
	createTime: number;
	like: number;
	tmpLike: number;
}
/**
 * 活動工作人員
 * @property id 用戶的 gmail
 * @property name 成員姓名
 * @property job 職位稱呼 ex: 組長/組員
 * @property department 隸屬部門
 * @property admin 管理事件列表
 */
export interface Member {
	id?: string;
	name: string;
	job: string;
	department: enums.DEPARTMENT;
	admin: string[];
}
/**
 * 活動事件
 * @property id 事件編號
 * @property startTime 事件開始時間
 * @property endTime 事件結束時間
 * @property place 事件發生地點
 * @property image 事件展示圖片
 * @property topic 事件主題
 * @property type 事件類別
 * @property title 事件標題
 * @property blocks 事件詳細資訊塊s
 */
export interface Event {
	id?: string;
	startTime: number;
	endTime: number;
	place: Place;
	image: Images;
	type: enums.EVENT_TYPE;
	topic: string;
	title: string;
	blocks: Block[];
}
/**
 * 事件詳細資訊塊
 * @property type 資訊塊類別
 * @property text 資訊塊文字
 * @property url 資訊塊連結
 * @property title 資訊塊標題
 * @property items 子資訊列表
 */
export interface Block {
	type: enums.BlOCK_TYPE;
	text: string;
	url: string;
	title: string;
	items: Item[];
}
/**
 * 子資訊列表
 * @property type 子資訊類型
 * @property url 子資訊連結
 * @property name 子資訊文字(名稱)
 */
export interface Item {
	type: enums.ITEM_TYPE;
	url: string;
	name: string;
}
/**
 * 事件地點
 * @property name 地點名稱
 * @property url 地點網址
 */
export interface Place {
	name: string;
	url: string;
}
/**
 * 事件展示圖
 * @property card 卡片用展示圖
 * @property banner 橫幅展示圖
 */
export interface Images {
	card: string;
	banner: string;
}
/**
 * 用戶暫存資料
 * @property likeArtwork 暫存用戶當日喜歡的作品
 */
export interface UserTmpData {
	likeArtwork: string[];
}
