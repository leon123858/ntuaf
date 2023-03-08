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
			}}
			bodyStyle={{padding: "0"}}
			className={inBreakPoint ? style.container : style.lgContainer}
		>
			<div className={inBreakPoint ? '' : style.lgDisplay}>
				<div>
					<p className={`${style.category} ${style.firstCategory}`}>一般活動  General Activity</p>
					<div
						className={
							inBreakPoint ? style.dataContainer : style.lgEventContainer
						}
					>
						{data.data.activity.length !== 0 ? (
							data.data.activity.map((a, idx) => (
								<div
									key={idx}
									className={style.event}
									onClick={() => handleOnClick(a.id)}
									style={{color: '#25499D'}}
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
					<p
						className={`${style.category} ${
							inBreakPoint ? '' : style.firstCategory
						}`}
					>
						常設展覽  Permanent Exhibition
					</p>
					<div
						className={
							inBreakPoint ? style.dataContainer : style.lgExhibitionContainer
						}
					>
						{data.data.exhibition.length !== 0 ? (
							data.data.exhibition.map((a, idx) => (
								<div
									key={idx}
									className={style.event}
									onClick={() => handleOnClick(a.id)}
									style={{color: '#D7497C'}}
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
