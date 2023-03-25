import React, { useEffect, useState , useContext } from 'react';
import { Tabs, Spin } from 'antd';

import { useParams } from 'react-router-dom';
import style from './Introduce.module.css';
import EventList from '../components/EventList/EventList';
import EventListEx from '../components/EventList/EventListEx';
import { getTabEvents } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../useBreakPoint';
import './custom.css';

function Introduce() {
	const { type = 1 } = useParams();
	const [key, setKey] = useState(type);
	const [firstData, setFirstData] = useState({ events: [] });
	const [secondData, setSecondData] = useState({ events: [] });
	const onChange = (e) => setKey(e);
	const { inBreakPoint } = useContext(BreakPointContext);


	useEffect(() => {
		const curKey = (type === 'exhibition') ? '1' : '2'
		setKey(curKey);
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


	const tabBarStyle = {
		padding: 10,
		activeTab: {
			color : 'gray',
		},
	};
	

	return (
		<div className={style.APP}>
			<br/>
			<br/><br/>
			<Tabs
				// className={style.container}
				activeKey={key}
				centered
				tabBarStyle={tabBarStyle}
				items={[
					{
						key: '1',
						label: '展覽',
						children: (
							(firstData.events.length === 0) 
							? <div className={style.Spin}><Spin /></div>
							: <EventListEx data={firstData} />
						),
					},
					{
						key: '2',
						label: `活動`,
						children: (
							(secondData.events.length === 0) 
							? <div className={style.Spin}><Spin /></div>
							: <EventList data={secondData} />
						),
					},
				]}
				onChange={onChange}
				className={style.customTabs}
				tabBarGutter={ inBreakPoint ? 80 : 150 }
			></Tabs>
			
		</div>
	);
}

export default Introduce;