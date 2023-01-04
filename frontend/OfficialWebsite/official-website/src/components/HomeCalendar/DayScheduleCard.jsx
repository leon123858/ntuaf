import React from 'react';
import { Card } from 'antd';
import style from './DayScheduleCard.module.css';

const DayScheduleCard = ({data}) => {
	return (
        <Card title={`${data.month} / ${data.date}`} className={style.container}>
            <p className={style.category}>當天活動</p>
            <div className={style.dataContainer}>
            {
                (data.data.activity.length !== 0) ?
                data.data.activity.map((a, idx) => (
                    <div key={idx} className={style.event}>
                        <p className={style.eventName}>{a.name}</p>
                        <p className={style.eventInfo}>{a.info}</p>
                    </div>
                )) :
                (
                    <div className={style.event}>
                        <p className={style.eventName}>今日沒有活動</p>
                        <p className={style.eventInfo}>明天再來</p>
                    </div>
                )
            }
            </div>
            
            <p className={style.category}>常態展覽</p>
            <div className={style.dataContainer}>
            {
                (data.data.exhibition.length !== 0) ?
                data.data.exhibition.map((a, idx) => (
                    <div className={style.event}>
                        <p className={style.eventName}>{a.name}</p>
                        <p className={style.eventInfo}>{a.info}</p>
                    </div>
                )) :
                (
                    <div className={style.event}>
                        <p className={style.eventName}>今日沒有活動</p>
                        <p className={style.eventInfo}>明天再來</p>
                    </div>
                )
            }
            </div>
        </Card>
	);
};
export default DayScheduleCard;
