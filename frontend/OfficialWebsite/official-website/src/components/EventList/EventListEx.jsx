import React, { useContext , useState } from 'react';
import { Card, Tag, Image } from 'antd';
import style from './EventList.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const { Meta } = Card;

const EventImg = ({ tagName, imgUrl, inBreakPoint }) => {

	const tagStyle = {
		borderRadius: '15px',
		backgroundColor: '#FFFFFF',
		color: '#D7497C',
		padding: '8px 15px',
		fontSize : 14,
		fontWeight: 'bold',
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
				<Tag style={tagStyle} >{tagName}</Tag>
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
			style={{ width: 320, position: 'relative' , boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)', background : !isHovered? '#FFFFFF' : '#D7497C'}}
			cover={
				<div style={{ height : '150px' }}>
				<EventImg
					tagName={tagName}
					imgUrl={imgUrl}
					inBreakPoint={inBreakPoint}
					style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)' }}
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
			<Meta title={<span style={{ fontSize: '20px' , color : isHovered? '#FFFFFF': '#D7497C' }}>{title}</span>}  description={<span style={{ color : isHovered? '#FFFFFF': '#D7497C' }}>{date}</span>} className={style.meta} />
		</Card>
		
	);
};

function EventList({ data }) {
	const { inBreakPoint } = useContext(BreakPointContext);
	const spanRWD = inBreakPoint ? 24 : 12;
	return (
		<div className={`${style.flexCenter} ${style.container}`}>
			<div className={(inBreakPoint) ? style.grid : style.lgGrid}>
				{data.events
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
	);
}

export default EventList;