import React, { useContext } from 'react';
import { Card, Tag, Image } from 'antd';
import style from './EventList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { Typography } from 'antd';

const { Title } = Typography;

const { Meta } = Card;

const EventImg = ({ tagName, imgUrl, inBreakPoint }) => {
	return (
		<div className={inBreakPoint ? style.eventImg1 : style.eventImg2}>
			<div className={`${style.img} ${style.flexCenter}`}>
				<Image
					src={imgUrl}
					fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
				/>
			</div>
			<div className={style.tag}>
				<Tag color='geekblue'>{tagName}</Tag>
			</div>
		</div>
	);
};
const Event = ({ tagName, imgUrl, title, date, inBreakPoint, id }) => {
	const handleOnClick = (id) => window.open(`/display/${id}`, '_blank');
	return (
		<Card
			hoverable
			style={{ width: 320, position: 'relative' }}
			cover={
				<EventImg
					tagName={tagName}
					imgUrl={imgUrl}
					inBreakPoint={inBreakPoint}
				/>
			}
			onClick={(e) => {
				if (e.target.className === 'ant-image-mask') {
					return;
				}
				handleOnClick(id);
			}}
		>
			<Meta title={title} description={date} className={style.meta} />
		</Card>
	);
};

function EventList({ data }) {
	const { inBreakPoint } = useContext(BreakPointContext);
	const spanRWD = inBreakPoint ? 24 : 12;
	return (
		<div className={`${style.container}`}>
			<div className={`${style.flexCenter} ${style.container}`}>
				<div className={inBreakPoint ? style.grid : style.lgGrid}>
					{data.events
						.filter(
							(event) =>
								!(event.tagName === '講座' || event.tagName === '工作坊')
						)
						.map((event) => (
							<div className={style.flexCenter} span={spanRWD} key={event.id}>
								<Event
									tagName={event.tagName}
									imgUrl={event.imgUrl}
									title={event.title}
									date={event.date}
									id={event.id}
									inBreakPoint={inBreakPoint}
								/>
							</div>
						))}
				</div>
			</div>
			<Title style={{ textAlign: 'center' }}> 講座/工作訪 </Title>
			<div className={`${style.flexCenter} ${style.container}`}>
				<div className={inBreakPoint ? style.grid : style.lgGrid}>
					{data.events
						.filter(
							(event) => event.tagName === '講座' || event.tagName === '工作坊'
						)
						.map((event) => (
							<div className={style.flexCenter} span={spanRWD} key={event.id}>
								<Event
									tagName={event.tagName}
									imgUrl={event.imgUrl}
									title={event.title}
									date={event.date}
									id={event.id}
									inBreakPoint={inBreakPoint}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default EventList;
