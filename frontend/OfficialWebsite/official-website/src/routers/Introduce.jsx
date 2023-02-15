import React from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import style from './Home.module.css';
import EventList from '../components/EventList/EventList'


function Introduce() {
	const { type } = useParams();

	return (
		<>
			<div className={style.APP}>
				<Tabs
					className={style.container}
					defaultActiveKey={type}
					centered
					items={[
						{
							key: '1',
							label: `展覽`,
							children: <EventList data={DefaultData}/>,
						},
						{
							key: '2',
							label: `活動`,
							children: <EventList data={DefaultData}/>,
						},
					]}
				>
				</Tabs>
			</div>
		</>
	);
}

export default Introduce;

const DefaultData = {
    events: [
        {
            tagName: "展覽",
            imgUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            title: "標題 1",
            date: "日期"
        },
        {
            tagName: "展覽",
            imgUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            title: "標題 2",
            date: "日期"
        },
        {
            tagName: "展覽",
            imgUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            title: "標題 3",
            date: "日期"
        },
    ]
}
