import React, { useContext , useState } from 'react';
import { Card, Tag, Image } from 'antd';
import style from './EventList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { Typography } from 'antd';

const { Title } = Typography;

const { Meta } = Card;

const EventImg = ({ tagName, imgUrl, inBreakPoint }) => {

	console.log(tagName);
	const tagStyle = {
		borderRadius: '15px',
		backgroundColor: '#25499D',
		color: '#FFFFFF',
		padding: '8px 10px',
		fontSize : 14,
		fontWeight: 'bold',
	};

	const tagStyle2 = {
		borderRadius: '15px',
		backgroundColor: '#A9CF59',
		color: '#FFFFFF',
		padding: '8px 10px',
		fontSize : 14,
		fontWeight: 'bold',
		fontfamily: 'Noto Sans CJK TC',
	};

	return (
		<div className={inBreakPoint ? style.eventImg1 : style.eventImg2}>
			<div className={inBreakPoint ? `${style.img} ${style.flexCenter}`: `${style.img2} ${style.flexCenter}`}>
				<Image
					src={imgUrl}
					fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
				/>
			</div>
			<div className={style.tag}>
				<Tag style={ tagName==='講座'||tagName==='工作坊'? tagStyle2 : tagStyle }>{tagName}</Tag>
			</div>
		</div>
	);
};
const Event = ({ tagName, imgUrl, title, date, inBreakPoint, id }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	
	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	const handleOnClick = (id) => window.open(`/display/${id}`, '_blank');
	return (

		<Card
			hoverable
			style={{ width: 320, position: 'relative' , boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)' , background : !isHovered ? '#FFFFFF' : (tagName==='講座'||tagName==='工作坊')? '#A9CF59' : '#25499D' }}
			cover={
				<div style={{ height: '150px' }}>
				<EventImg
					tagName={tagName}
					imgUrl={imgUrl}
					inBreakPoint={inBreakPoint}
				/>
				</div>
			}
			onClick={(e) => {
				if (e.target.className === 'ant-image-mask') {
					return;
				}
				handleOnClick(id);
			}}
			onMouseEnter={handleMouseEnter}
     		onMouseLeave={handleMouseLeave}
		>
			<Meta title={<span style={{ fontSize: '20px' , color : isHovered? '#FFFFFF': (tagName==='講座'||tagName==='工作坊')? '#A9CF59' : '#25499D' }}>{title}</span>} description={<span style={{ color : isHovered? '#FFFFFF': (tagName==='講座'||tagName==='工作坊')? '#A9CF59' : '#25499D' }}>{date}</span>} className={style.meta} />
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
			<br/>
			<br/>
			<Title style={{ textAlign: 'center' , fontSize : '20px' }}> 講座  /  工作坊 </Title>
			<br/>
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
