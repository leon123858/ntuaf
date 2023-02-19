import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import style from './Home.module.css';
import EventList from '../components/EventList/EventList';
import { getTabEvents } from '@leon123858/ntuaf-sdk';

function Introduce() {
	const { type = 1 } = useParams();
	const [key, setKey] = useState(type);
	const [firstData, setFirstData] = useState({ events: [] });
	const [secondData, setSecondData] = useState({ events: [] });
	const onChange = (e) => setKey(e);
	console.log("type", type)
	useEffect(() => {
		setKey(type);
	}, [type]);

	useEffect(() => {
		(async function () {
			const target = key === '1' ? '展覽' : '活動';
			const isEmpty =
				target === '展覽'
					? firstData.events.length === 0
					: secondData.events.length === 0;
			if (!isEmpty) {
				return;
			}
			const result = await getTabEvents(target);
			const newState = {
				events: [
					...result.map((v) => {
						return {
							tagName: v.subTab,
							imgUrl: v.url,
							title: v.title,
							date: v.date,
							id: v.id,
						};
					}),
				],
			};
			target === '展覽' ? setFirstData(newState) : setSecondData(newState);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	return (
		<>
			<div className={style.APP}>
				<Tabs
					className={style.container}
					activeKey={key}
					centered
					items={[
						{
							key: '1',
							label: `展覽`,
							children: <EventList data={firstData} />,
						},
						{
							key: '2',
							label: `活動`,
							children: <EventList data={secondData} />,
						},
					]}
					onChange={onChange}
				></Tabs>
			</div>
		</>
	);
}

export default Introduce;

// const DefaultData = {
// 	events: [
// 		{
// 			tagName: '展覽',
// 			imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
// 			title: '標題 1',
// 			date: '日期',
// 		},
// 		{
// 			tagName: '展覽',
// 			imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
// 			title: '標題 2',
// 			date: '日期',
// 		},
// 		{
// 			tagName: '展覽',
// 			imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
// 			title: '標題 3',
// 			date: '日期',
// 		},
// 	],
// };
