import React, { useEffect, useState, useContext } from 'react';
import { Tabs } from 'antd';

import { useParams } from 'react-router-dom';
import style from './Introduce.module.css';
import EventList from '../components/EventList/EventList';
import EventListEx from '../components/EventList/EventListEx';
import { getTabEvents } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../useBreakPoint';

function Introduce() {
	const { type = 1 } = useParams();
	const [key, setKey] = useState(type);
	const [firstData, setFirstData] = useState({ events: [] });
	const [secondData, setSecondData] = useState({ events: [] });
	const onChange = (e) => setKey(e);
	const { inBreakPoint } = useContext(BreakPointContext);

	useEffect(() => {
		const curKey = type === 'exhibition' ? '1' : '2';
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

	return (
		<div className={style.APP}>
			<br />
			<br />
			<br />
			<br />
			<br />
			<Tabs
				// className={style.container}
				animated={false}
				activeKey={key}
				centered
				items={[
					{
						key: '1',
						label:
							key === '1' ? (
								<>
									<h5
										style={{
											color: '#000000',
											fontSize: inBreakPoint ? '16px' : '18px',
											paddingBottom: '5px',
											letterSpacing: '10px',
										}}
									>
										{'展覽'}
									</h5>
									<div>
										<hr
											style={{
												background:
													'linear-gradient(to left, #A9CF59, #E73273, #25499D)',
												height: '2px',
												border: '0px',
												width: '85%',
											}}
										/>
									</div>
								</>
							) : (
								<h5
									style={{
										letterSpacing: '10px',
										fontSize: inBreakPoint ? '16px' : '18px',
										paddingBottom: '5px',
									}}
								>
									展覽
								</h5>
							),
						children:
							firstData.events.length === 0 ? (
								<div className={style.Spin}>
									<img
										src={'/loading.webp'}
										style={{ width: '18vw' }}
										alt='loading...'
									/>
								</div>
							) : (
								<EventListEx data={firstData} />
							),
					},
					{
						key: '2',
						label:
							key === '2' ? (
								<>
									<h5
										style={{
											color: '#000000',
											fontSize: inBreakPoint ? '16px' : '18px',
											paddingBottom: '5px',
											letterSpacing: '10px',
										}}
									>
										{'活動'}
									</h5>
									<div>
										<hr
											style={{
												background:
													'linear-gradient(to left, #A9CF59, #E73273, #25499D)',
												height: '2px',
												border: '0px',
												width: '85%',
											}}
										/>
									</div>
								</>
							) : (
								<h5
									style={{
										letterSpacing: '10px',
										fontSize: inBreakPoint ? '16px' : '18px',
										paddingBottom: '5px',
									}}
								>
									活動
								</h5>
							),
						children:
							secondData.events.length === 0 ? (
								<div className={style.Spin}>
									<img
										src={'/loading.webp'}
										style={{ width: '18vw' }}
										alt='loading...'
									/>
								</div>
							) : (
								<EventList data={secondData} />
							),
					},
				]}
				onChange={onChange}
				tabBarGutter={inBreakPoint ? 80 : 150}
				// type='card'
			></Tabs>
		</div>
	);
}

export default Introduce;
