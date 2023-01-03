import React from 'react';
import { Card } from 'antd';
import './DayScheduleCard.css';

const DayScheduleCard = ({data}) => {
	return (
        <Card title={`${data.month} / ${data.date}`} className='container'>
            <p className='category'>當天活動</p>
            <div className='dataContainer'>
            {
                (data.data.activity.length !== 0) ?
                data.data.activity.map((a, idx) => (
                    <Card key={idx}>
                        <div>
                            <p className='eventName'>{a.name}</p>
                            <p className='eventInfo'>{a.info}</p>
                        </div>
                    </Card>
                )) :
                (<Card>
                    <div>
                        <p className='eventName'>今日沒有活動</p>
                        <p className='eventInfo'>明天再來</p>
                    </div>
                </Card>)
            }
            </div>
            
            <p className='category'>常態展覽</p>
            <div className='dataContainer'>
            {
                (data.data.exhibition.length !== 0) ?
                data.data.exhibition.map((a, idx) => (
                    <Card key={idx}>
                        <div>
                            <p className='eventName'>{a.name}</p>
                            <p className='eventInfo'>{a.info}</p>
                        </div>
                    </Card>
                )) :
                (<Card>
                    <div>
                        <p className='eventName'>今日沒有活動</p>
                        <p className='eventInfo'>明天再來</p>
                    </div>
                </Card>)
            }
            </div>
        </Card>
	);
};
export default DayScheduleCard;
