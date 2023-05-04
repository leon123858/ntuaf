import React, { useContext } from 'react';
import { Card } from 'antd';
import style from './DayScheduleCard.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const DayScheduleCard = ({ data }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const handleOnClick = (id) => window.open(`/display/${id}`, '_blank');
	// console.log(data);

	return (
		<Card
			style={{
				backgroundColor: 'transparent',
				border: '0px',
				minHeight: 400,
			}}
			bodyStyle={{ padding: '0' }}
			className={inBreakPoint ? style.container : style.lgContainer}
		>
			{data.data.activity.length +
				data.data.workshop.length +
				data.data.exhibition.length !==
			0 ? (
				<div>
					<div>
						{data.data.activity.length !== 0 ? (
							<p className={`${style.category} ${style.firstCategory}`}>
								一般活動 General Activity
							</p>
						) : (
							<></>
						)}

						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							{data.data.activity.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.blue}`}
									style={inBreakPoint ? { width: '100%' } : {}}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))}
						</div>
					</div>

					<div>
						{data.data.workshop.length !== 0 ? (
							<p className={style.category}>講座/工作坊 Lecture / Workshop</p>
						) : (
							<></>
						)}
						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							{data.data.workshop.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.green}`}
									style={inBreakPoint ? { width: '100%' } : {}}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))}
						</div>
					</div>

					<div>
						{data.data.exhibition.length !== 0 ? (
							<p className={style.category}>常設展覽 Permanent Exhibition</p>
						) : (
							<></>
						)}
						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							{data.data.exhibition.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.pink}`}
									style={inBreakPoint ? { width: '100%' } : {}}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div>
					<div>
						<p className={`${style.category} ${style.firstCategory}`}>
							一般活動 General Activity
						</p>
						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							<div
								className={style.event}
								style={
									inBreakPoint
										? { width: '100%', background: '#EFEFEF', color: '#7A7979' }
										: { background: '#EFEFEF', color: '#7A7979' }
								}
							>
								<p className={style.eventName}>今日目前無活動</p>
								<p className={style.eventInfo}>點選其他有圓點的日子！</p>
							</div>
						</div>
					</div>

					<div>
						<p className={style.category}>講座/工作坊 Lecture / Workshop</p>
						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							<div
								className={style.event}
								style={
									inBreakPoint
										? { width: '100%', background: '#EFEFEF', color: '#7A7979' }
										: { background: '#EFEFEF', color: '#7A7979' }
								}
							>
								<p className={style.eventName}>今日目前無活動</p>
								<p className={style.eventInfo}>點選其他有圓點的日子！</p>
							</div>
						</div>
					</div>

					<div>
						<p className={style.category}>常設展覽 Permanent Exhibition</p>
						<div
							className={style.eventContainer}
							style={inBreakPoint ? { maxWidth: 384 } : {}}
						>
							<div
								className={style.event}
								style={
									inBreakPoint
										? { width: '100%', background: '#EFEFEF', color: '#7A7979' }
										: { background: '#EFEFEF', color: '#7A7979' }
								}
							>
								<p className={style.eventName}>今日目前無活動</p>
								<p className={style.eventInfo}>點選其他有圓點的日子！</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</Card>
	);
};
export default DayScheduleCard;
