import { connectEmulator } from '../src/utils/connectEmulator';
// import { Member, Artwork, Event } from '../src/types/types';
// import { DEPARTMENT, ARTWORK_TYPE, EVENT_TYPE } from '../src/types/enums';
// import { dbInstance } from '../src/utils/initFirebase';
// import { doc, setDoc } from 'firebase/firestore';

// const artworks: Artwork[] = [
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 		like: 2,
// 		tmpLike: 3,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 		like: 22,
// 		tmpLike: 33,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PAINTING,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 		like: 0,
// 		tmpLike: 3,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PHOTO,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 		like: 3,
// 		tmpLike: 0,
// 	},
// 	{
// 		type: ARTWORK_TYPE.PHOTO,
// 		name: '林小小',
// 		email: 'mail',
// 		url: 'url',
// 		text: 'text',
// 		createTime: 12345,
// 		like: 0,
// 		tmpLike: 0,
// 	},
// ];
// const events: Event[] = [
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.展覽,
// 		title: 'test1',
// 		blocks: [],
// 	},
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.工作坊,
// 		title: 'test2',
// 		blocks: [],
// 	},
// 	{
// 		startTime: 123456,
// 		endTime: 234567,
// 		place: {
// 			name: 'test',
// 			url: 'test',
// 		},
// 		image: {
// 			card: 'test',
// 			banner: 'test',
// 		},
// 		type: EVENT_TYPE.舞台表演,
// 		title: 'test3',
// 		blocks: [],
// 	},
// ];
// const members = [
// 	{
// 		department: '核心團隊',
// 		name: '廖桓誼',
// 		email: 'b09302209@ntu.edu.tw',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '呂宜熹',
// 		email: 'muospeare@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '徐　棋',
// 		email: 'kyle0907@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '曾彥禎',
// 		email: 'ajean9388@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '蔡沐學',
// 		email: 'tsaimuhsueh@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '何孟軒',
// 		email: 'ho910602@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '鄭筠諠',
// 		email: 'yuyuyun731@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '姚傑薰',
// 		email: 'jessiey2020@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '張茗瑜',
// 		email: 'gtp030118@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '陳柏因',
// 		email: 'sunny910213@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '陳　曄',
// 		email: 'yechen.taipei@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '簡立夫',
// 		email: 'lifuchien@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '曾湘庭',
// 		email: 'tintintaylor12@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '劉珍如',
// 		email: 'jeanneliu77@gmail.com',
// 	},
// 	{
// 		department: '核心團隊',
// 		name: '薛淳云',
// 		email: 'vera970019@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '林語暘',
// 		email: 'yuyuan2112@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '唐子晴',
// 		email: 'a0983906079@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '葉妮箏',
// 		email: 'kellyyeh88866@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '江孟軒',
// 		email: 'isa910904@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '張華芸',
// 		email: 'planta901230@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '吳芊昱',
// 		email: 'qwu73853@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '林鈺婷',
// 		email: 'f11634309@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '胡宛恩',
// 		email: 'lisahu51321@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '蔡宗漢',
// 		email: 'hank.thtsai@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '江欣蓓',
// 		email: 'betty20011003@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '李嘉元',
// 		email: 'leeapple60428@gmail.com',
// 	},
// 	{
// 		department: '行政部',
// 		name: '葉珊珊',
// 		email: 'goldfishbbg@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '王思媛',
// 		email: 'rainie910802@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '江宥廷',
// 		email: 'yutingchiang@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '林佩蓁',
// 		email: 'qaz11170325@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '許文藍',
// 		email: 'claire911113@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '陳孟夏',
// 		email: 'vgood.emily@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '黃國哲',
// 		email: 'jeff910926@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '詹雅涵',
// 		email: 'rebecca920830@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '李東儒',
// 		email: 'leector9@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '莊于靖',
// 		email: 'ching112091@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '陳廷維',
// 		email: 'qqfairyoscar@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '陳奕妏',
// 		email: 'nikefoodie@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '陳彥臻',
// 		email: 'h540402@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '陳昱慈',
// 		email: 'angelchen262@gmail.com',
// 	},
// 	{
// 		department: '公關部',
// 		name: '鍾姷廷',
// 		email: 'youtin2020@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '張日耀',
// 		email: 'riyaoz0610@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '曾靖雯',
// 		email: 'melodayisme@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '粟巧媛',
// 		email: 'chiaoyuans.2001@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '鄭惟元',
// 		email: 'weiyuan0819@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '蘇琬茜',
// 		email: 'viviansu911223@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '高　涵',
// 		email: 'tinaouo636363@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '黃子芯',
// 		email: 'cindy0228.ch@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '蔡瑜軒',
// 		email: 'sherry98200@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '賴郁欣',
// 		email: 'yuxinstar8@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '謝菩家',
// 		email: 'jasmine880308@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '蘇芳玉',
// 		email: 'jadesu9631@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '何紹群',
// 		email: 'shaochunho@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '李亮誼',
// 		email: 'leeliangyi@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '李筠捷',
// 		email: 'sophia0130.tseng@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '曾聖軒',
// 		email: 'stanely17@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '楊絜琳',
// 		email: 'joleneyang79@gmail.com',
// 	},
// 	{
// 		department: '設計部',
// 		name: '鄭守喆',
// 		email: 'jerry56568492@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王名褕',
// 		email: 'audreywang2003@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王芷筠',
// 		email: 'wcindy0402@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '朱庭萱',
// 		email: 'kea0910@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '江蘋軒',
// 		email: 'may40121@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '何亞璇',
// 		email: 'karen97010525@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '李　玟',
// 		email: 'b11105004@g.ntu.edu.tw',
// 	},
// 	{
// 		department: '策展部',
// 		name: '周梓齊',
// 		email: 'kc42519@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '張唯真',
// 		email: 'virginiachang901019@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '莊之瑀',
// 		email: '3623579@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '許又云',
// 		email: 'claire020300@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳　馨',
// 		email: 'chenshin0119@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳翰文',
// 		email: 'hanwen891004@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '葉宛和',
// 		email: 'lummycoffee66@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '齊玟琳',
// 		email: 'iamchipp0104@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '蔡妍辰',
// 		email: 'cc.teagan@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '鄧宇捷',
// 		email: 'erica50317410@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '鄭亞昕',
// 		email: 'vivian2030621@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '賴麒文',
// 		email: 'eric89926@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '應嘉倪',
// 		email: 'nini76584321@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '羅　迦',
// 		email: 'lochia2002@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王筱棋',
// 		email: 'b09207017@g.ntu.edu.tw',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王齡可',
// 		email: 'b10704063@g.ntu.edu.tw',
// 	},
// 	{
// 		department: '策展部',
// 		name: '吳恆盈',
// 		email: 'hannah.hy41@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '呂紀萱',
// 		email: 'jessica920302@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '林子韵',
// 		email: 'melody901110@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '林睦軒',
// 		email: '31013.willy@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '侯　喆',
// 		email: 'geegeeho891021@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳建宇',
// 		email: 'cycthomas@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳燕妮 Hugie',
// 		email: 'hugiekalandra@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '葉婷絹',
// 		email: 'melodyyeh27@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '劉又瑜',
// 		email: 'u13505@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '鄭靜蓉',
// 		email: 'jr0327jr@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王士涵',
// 		email: 'christine893324@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '王子凌',
// 		email: 'annabella.wang2001@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '朱心沛',
// 		email: 'veronicachu3@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '林久妍',
// 		email: '09linjiu@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '林建成',
// 		email: 'asd4753691@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '洪翊淳',
// 		email: 'yiiiichun@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '高羽柔',
// 		email: 'rainbridge15@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '張慧心',
// 		email: 'emma.mimi506@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '許芯瑜',
// 		email: 'jessie30428@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳亭卉',
// 		email: 'melody030107@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '陳柏均',
// 		email: 'junchen.8889@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '蔡書萱',
// 		email: 'shuhsuan900623@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '蔡詠臻',
// 		email: 'jennytsai0424@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '龔貞心',
// 		email: 'b09109037@g.ntu.edu.tw',
// 	},
// 	{
// 		department: '策展部',
// 		name: '胡海晴',
// 		email: 'annie21066@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '李汶凌',
// 		email: 'jocelynlee208@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '周宥辰',
// 		email: 'dsa66253@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '林俊佑',
// 		email: 'a0970785699@gmail.com',
// 	},
// 	{
// 		department: '策展部',
// 		name: '邱冠銘',
// 		email: 'guanmingchiu@gmail.com',
// 	},
// ];

before(async function () {
	// this.timeout(100 * 1000);
	console.log('start test');
	connectEmulator();
	// create data (show open rule, just use when no save-data)
	// await Promise.all(
	// 	members.map((v, i) => {
	// 		return setDoc(doc(dbInstance, 'Members', `${v.email}`), {
	// 			name: v.name,
	// 			department: v.department,
	// 			job: Math.random() > 0.8 ? '組長' : '組員',
	// 			admin: [],
	// 		} as Member);
	// 	})
	// );
	// await Promise.all(
	// 	artworks.map((v, i) => {
	// 		const { name, email, url, text, createTime } = v;
	// 		return setDoc(doc(dbInstance, 'Artworks', `test${i}`), {
	// 			...v,
	// 			name: name + i,
	// 			email: email + i,
	// 			url: url + i,
	// 			text: text + i,
	// 			createTime: createTime + i,
	// 		});
	// 	})
	// );
	// await Promise.all(
	// 	events.map((v, i) => {
	// 		return setDoc(doc(dbInstance, 'Events', `test${i}`), v);
	// 	})
	// );
});

after(async () => {
	console.log('end test');
});
