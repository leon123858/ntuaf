import React, { useContext, useState } from 'react';
import { Card, Tag, Image } from 'antd';
import style from './EventList.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const { Meta } = Card;

const EventImg = ({ tagName, imgUrl, inBreakPoint, isHovered }) => {
	const tagStyle = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#FFFFFF',
		color: '#D7497C',
		padding: '7px 12px',
		fontSize: 12,
		letterSpacing: '2px',
	};

	const tagStyle2 = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#D7497C',
		color: '#FFFFFF',
		padding: '7px 12px',
		fontSize: 12,
		letterSpacing: '2px',
	};

	return (
		<div className={inBreakPoint ? style.eventImg1 : style.eventImg2}>
			<div
				className={
					inBreakPoint
						? `${style.img} ${style.flexCenter}`
						: `${style.img2} ${style.flexCenter}`
				}
			>
				<Image
					preview={false}
					src={imgUrl}
					fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
				/>
			</div>
			<div className={style.tag}>
				<Tag style={isHovered ? tagStyle : tagStyle2}>{tagName}</Tag>
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

	const handleOnClick = (id) =>
		window.open(`/display/${id}`, inBreakPoint ? '_self' : '_blank');
	return (
		<Card
			hoverable
			style={{
				width: 320,
				position: 'relative',
				boxShadow: '4px 4px 15px rgba(0 0 0/21%)',
				background: !isHovered ? '#FFFFFF' : '#D7497C',
				marginBottom: '30px',
				borderRadius: '15px',
			}}
			cover={
				<div style={{ height: '150px' }}>
					<EventImg
						tagName={tagName}
						imgUrl={imgUrl}
						inBreakPoint={inBreakPoint}
						style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)' }}
						isHovered={isHovered}
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
			<Meta
				title={
					<span
						style={{
							fontSize: '16px',
							fontWeight: '450',
							color: isHovered ? '#FFFFFF' : '#D7497C',
							letterSpacing: '2px',
						}}
					>
						{title}
					</span>
				}
				description={
					<span
						style={{
							fontSize: '14px',
							color: isHovered ? '#FFFFFF' : '#D7497C',
							letterSpacing: '2px',
						}}
					>
						{date}
					</span>
				}
				className={style.meta}
			/>
		</Card>
	);
};

function EventList({ data }) {
	const { inBreakPoint } = useContext(BreakPointContext);
	const spanRWD = inBreakPoint ? 24 : 12;
	return (
		<div className={`${style.flexCenter} ${style.container}`}>
			<div className={inBreakPoint ? style.grid : style.lgGrid}>
				{data.events.map((event) => (
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
