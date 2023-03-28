import React, { useContext, useState, useEffect, useRef } from 'react';
import style from './MemberTab.module.css';
import { Tabs, Carousel, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { BreakPointContext } from '../../useBreakPoint';
import { getMembersByDepartment, DEPARTMENT } from '@leon123858/ntuaf-sdk';

const departmentNames = [
	DEPARTMENT.核心團隊,
	DEPARTMENT.設計部,
	DEPARTMENT.行政部,
	DEPARTMENT.公關部,
	DEPARTMENT.策展部,
];

const teamImages = {
	[DEPARTMENT.核心團隊]: [
		'../../about/team/召部.jpg',
	],
	[DEPARTMENT.公關部]: [
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	],
	[DEPARTMENT.策展部]: [
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format'
	],
	[DEPARTMENT.行政部]: [
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	],
	[DEPARTMENT.設計部]: [
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
	]
};

const PositionRow = ({ members, position }) => {
	return (
		<div className={style.positionRow}>
			<p style={{ margin: 0 }}>{position}</p>
			<div className={style.memberContainer}>
				{members.map((member, idx) =>
					member.job === position ? (
						<div key={idx} className={style.member}>
							<span>{member.name}</span>
						</div>
					) : (
						''
					)
				)}
			</div>
		</div>
	);
};

const ImgCarousel = ({ imgList }) => {
	const imgs = useRef(null)
	if (!imgList) return <></>
	const contentStyle = {
		height: '160px',
		color: '#fff',
		lineHeight: '100px',
		textAlign: 'center',
		background: '#364d79',
	};
	console.log(imgList)
	const showArrow = imgList.length > 1 ? true : false
	return (
		<>
			<Carousel autoplay ref={imgs}>
				{imgList.map(img => (
					<div key={img}>
						<img src={img} alt="" className={style.lgImg} />
					</div>
				))}
			</Carousel>
			{showArrow ?
				<div>
					<Button className={style.arrowRight} icon={<RightOutlined />} shape="circle" onClick={() => imgs.current.next()}></Button>
					<Button className={style.arrowLeft} icon={<LeftOutlined />} shape="circle" onClick={() => imgs.current.prev()}></Button>
				</div>
				:
				""
			}
		</>
	)
}

const MemberTab = () => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const [curDepartment, setCurDepartment] = useState(DEPARTMENT.核心團隊);
	const [memberData, setMemeberData] = useState([]);
	const [memberStorage, setMemberStorage] = useState({});

	useEffect(() => {
		(async function () {
			if (memberStorage[curDepartment]) {
				setMemeberData(memberStorage[curDepartment]);
				return;
			}
			const data = await getMembersByDepartment(curDepartment);
			setMemeberData(data);
			setMemberStorage({ ...memberStorage, [curDepartment]: data });
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [curDepartment]);

	return (
		<div className={style.container}>
			<Tabs
				centered
				defaultActiveKey='1'
				size={inBreakPoint ? "small" : 'large'}
				items={departmentNames.map((departmentName, i) => {
					return {
						label: departmentName,
						key: departmentName,
						children: (
							<div
								className={inBreakPoint ? style.department : style.lgDepartment}
							>
								{/* <img
									alt='team img'
									src={teamImages[departmentName]}
									className={inBreakPoint ? style.img : style.lgImg}
								/> */}
								{curDepartment === '核心團隊' ? (
									<div className={inBreakPoint ? "" : style.flexHalf}>
										<PositionRow members={memberData} position={'總召'} />
										<PositionRow members={memberData} position={'副召'} />
									</div>
								) : (
									<div className={inBreakPoint ? "" : style.flexHalf}>
										<PositionRow members={memberData} position={'部長'} />
										<PositionRow members={memberData} position={'組員'} />
									</div>
								)}
							</div>
						),
					};
				})}
				onChange={(key) => setCurDepartment(key)}
			></Tabs>
			<div className={inBreakPoint ? style.carouelContainer : style.lgcarouelContainer}>
				<ImgCarousel imgList={teamImages[curDepartment]} />
			</div>
		</div>
	);
};
export default MemberTab;
