import React, { useContext, useState } from 'react';
import { Card, Tag, Image } from 'antd';
import style from './EventList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { Typography } from 'antd';

const { Title } = Typography;

const { Meta } = Card;

const EventImg = ({ tagName, imgUrl, inBreakPoint, isHovered }) => {
	// console.log(tagName);
	const tagStyle12 = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#25499D',
		color: '#FFFFFF',
		padding: '7px 12px',
		fontSize: 12,
		letterSpacing: '2px',
	};
	const tagStyle = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#FFFFFF',
		color: '#25499D',
		padding: '7px 12px',
		fontSize: 12,
		letterSpacing: '2px',
	};

	const tagStyle22 = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#A9CF59',
		color: '#FFFFFF',
		padding: '7px 12px',
		fontSize: 12,
		fontfamily: 'Noto Sans CJK TC',
		letterSpacing: '2px',
	};

	const tagStyle2 = {
		borderStyle: 'none',
		borderRadius: '15px',
		backgroundColor: '#FFFFFF',
		color: '#A9CF59',
		padding: '7px 12px',
		fontSize: 12,
		fontfamily: 'Noto Sans CJK TC',
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
				<Image preview={false} src={imgUrl} fallback='/loading.jpg' />
			</div>
			<div className={style.tag}>
				<Tag
					style={
						tagName.includes('講座') || tagName.includes('工作坊')
							? isHovered
								? tagStyle2
								: tagStyle22
							: isHovered
							? tagStyle
							: tagStyle12
					}
				>
					{tagName}
				</Tag>
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
				background: !isHovered
					? '#FFFFFF'
					: tagName.includes('講座') || tagName.includes('工作坊')
					? '#A9CF59'
					: '#25499D',
				marginBottom: '30px',
			}}
      
			cover={
				<div style={{ height: '120px' }}>
					<EventImg
						tagName={tagName}
						imgUrl={imgUrl}
						inBreakPoint={inBreakPoint}
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
							color: isHovered
								? '#FFFFFF'
								: tagName.includes('講座') || tagName.includes('工作坊')
								? '#A9CF59'
								: '#25499D',
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
							color: isHovered
								? '#FFFFFF'
								: tagName.includes('講座') || tagName.includes('工作坊')
								? '#A9CF59'
								: '#25499D',
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
		<div className={`${style.container}`}>
			<div className={`${style.flexCenter} ${style.container}`}>
				<div className={inBreakPoint ? style.grid : style.lgGrid}>
					{data.events
						.filter(
							(event) =>
								!(
									event.tagName.includes('講座') ||
									event.tagName.includes('工作坊')
								)
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
			<br />
			<br />
			<Title
				style={{
					textAlign: 'center',
					fontSize: '16px',
					letterSpacing: '2px',
					fontWeight: '400',
				}}
			>
				{' '}
				講座 / 工作坊{' '}
			</Title>
			<br />
			<div className={`${style.flexCenter} ${style.container}`}>
				<div className={inBreakPoint ? style.grid : style.lgGrid}>
					{data.events
						.filter(
							(event) =>
								event.tagName.includes('講座') ||
								event.tagName.includes('工作坊')
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
