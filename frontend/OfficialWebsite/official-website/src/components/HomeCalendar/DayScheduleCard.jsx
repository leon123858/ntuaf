import React, { useContext } from 'react';
import { Card } from 'antd';
import style from './DayScheduleCard.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const DayScheduleCard = ({data}) => {
    const { inBreakPoint } = useContext(BreakPointContext);
	return (
        <Card title={(inBreakPoint) ? '' : `${data.month} / ${data.date}`} className={(inBreakPoint) ? style.container : style.lgContainer}>
            <div className={(inBreakPoint) ? '' : style.lgDisplay}>
                <div>
                    <p className={style.category}>當天活動</p>
                    <div className={(inBreakPoint) ? style.dataContainer : style.lgDataContainer}>
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
                </div>
                
                <div>
                    <p className={style.category}>常態展覽</p>
                    <div className={(inBreakPoint) ? style.dataContainer : style.lgDataContainer}>
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
                </div>
            </div>
        </Card>
	);
};
export default DayScheduleCard;
