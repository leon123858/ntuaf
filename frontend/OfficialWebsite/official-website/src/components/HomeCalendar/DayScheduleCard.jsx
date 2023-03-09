import React, { useContext } from 'react';
import { Card } from 'antd';
import style from './DayScheduleCard.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const DayScheduleCard = ({ data }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const handleOnClick = (id) => window.open(`/display/${id}`, '_blank');

	return (
		<Card
			style={{
				backgroundColor: 'transparent',
				border: '0px',
				minHeight: 400,
			}}
			bodyStyle={{padding: "0"}}
			className={inBreakPoint ? style.container : style.lgContainer}
		>
			<div>
				<div>
					<p className={`${style.category} ${style.firstCategory}`}>一般活動  General Activity</p>
					<div className={ style.eventContainer}>
						{data.data.activity.length !== 0 ? (
							data.data.activity.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.blue}`}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))
						) : (
							<div className={style.event}>
									<p className={style.eventName}>今日沒有活動</p>
									<p className={style.eventInfo}>明天再來</p>
							</div>
						)}
					</div>
				</div>

				<div>
					<p className={style.category}>
						講座/工作坊  Lecture / Workshop
					</p>
					<div className={ style.eventContainer}>
						{data.data.workshop.length !== 0 ? (
							data.data.workshop.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.green}`}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))
						) : (
							<div className={style.event}>
								<p className={style.eventName}>今日沒有活動</p>
								<p className={style.eventInfo}>明天再來</p>
							</div>
						)}
					</div>
				</div>

				<div>
					<p className={style.category}>
						常設展覽  Permanent Exhibition
					</p>
					<div className={ style.eventContainer}>
						{data.data.exhibition.length !== 0 ? (
							data.data.exhibition.map((a, idx) => (
								<div
									key={idx}
									className={`${style.event} ${style.pink}`}
									onClick={() => handleOnClick(a.id)}
								>
									<p className={style.eventName}>{a.name}</p>
									<p className={style.eventInfo}>{a.info}</p>
								</div>
							))
						) : (
							<div className={style.event}>
								<p className={style.eventName}>今日沒有活動</p>
								<p className={style.eventInfo}>明天再來</p>
							</div>
						)}
					</div>
				</div>

			</div>
		</Card>
	);
};
export default DayScheduleCard;
