import React, { useContext, useState, useEffect, useRef } from 'react';
import style from './MemberTab.module.css';
import { Tabs, Carousel, Button, Image, Spin } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { BreakPointContext } from '../../useBreakPoint';
import { getMembersByDepartment, DEPARTMENT } from '@leon123858/ntuaf-sdk';
// import Hr from '../Hr/Hr';

const departmentNames = [
	DEPARTMENT.核心團隊,
	DEPARTMENT.設計部,
	DEPARTMENT.行政部,
	DEPARTMENT.公關部,
	DEPARTMENT.策展部,
];

const teamImages = {
	[DEPARTMENT.核心團隊]: ['../../about/team/召部.jpeg'],
	[DEPARTMENT.公關部]: ['../../about/team/學術.jpeg'],
	[DEPARTMENT.策展部]: [
		'../../about/team/數位.jpeg',
		'../../about/team/活動.jpeg',
		'../../about/team/展覽.jpeg',
	],
	[DEPARTMENT.行政部]: ['../../about/team/行政.jpeg'],
	[DEPARTMENT.設計部]: [
		'../../about/team/文宣組.jpeg',
		'../../about/team/主視覺組.jpeg',
		'../../about/team/影像組.jpeg',
	],
};

const PositionRow = ({ members, position, inBreakPoint }) => {
	const fontSize = inBreakPoint ? '16px' : '18px';
	return (
		<div
			className={inBreakPoint ? style.positionRow : style.lgPositionRow}
			style={{ fontSize }}
		>
			<p style={{ margin: 0, fontWeight: inBreakPoint ? 'bold' : '550' }}>
				{position}
			</p>
			<div
				className={
					inBreakPoint ? style.memberContainer : style.lgMemberContainer
				}
			>
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

const ImgCarousel = ({ imgList, inBreakPoint }) => {
	const imgs = useRef(null);
	if (!imgList) return <></>;
	// console.log(imgList);
	const showArrow = imgList.length > 1 && !inBreakPoint ? true : false;
	return (
		<>
			<Carousel autoplay ref={imgs}>
				{imgList.map((img) => (
					<div key={img}>
						<Image
							src={img}
							preview={false}
							placeholder={<Spin />}
							alt=''
							style={{ borderRadius: '10px' }}
						/>
					</div>
				))}
			</Carousel>
			{showArrow ? (
				<div>
					<Button
						className={style.arrowRight}
						icon={<RightOutlined />}
						shape='circle'
						onClick={() => imgs.current.next()}
					></Button>
					<Button
						className={style.arrowLeft}
						icon={<LeftOutlined />}
						shape='circle'
						onClick={() => imgs.current.prev()}
					></Button>
				</div>
			) : (
				''
			)}
		</>
	);
};

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
				// type='card'
				animated={false}
				defaultActiveKey='1'
				size={inBreakPoint ? 'small' : 'large'}
				items={departmentNames.map((departmentName, i) => {
					return {
						label:
							curDepartment === departmentName ? (
								<>
									<h5
										style={{
											color: '#000000',
											fontSize: inBreakPoint ? '16px' : '18px',
											paddingBottom: '5px',
											letterSpacing: '0px',
										}}
									>
										{departmentName}
									</h5>
									<div>
										<hr
											style={{
												background:
													'linear-gradient(to left, #A9CF59, #E73273, #25499D)',
												height: '2px',
												border: '0px',
											}}
										/>
									</div>
								</>
							) : (
								<h5
									style={{
										fontSize: inBreakPoint ? '16px' : '18px',
										paddingBottom: '5px',
										letterSpacing: '0px',
									}}
								>
									{departmentName}
								</h5>
							),
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
									<div
										className={inBreakPoint ? style.flexHalf : style.lgFlexHalf}
									>
										<PositionRow
											members={memberData}
											position={'總召'}
											inBreakPoint={inBreakPoint}
										/>
										<div style={{ height: '15px' }}></div>
										<PositionRow
											members={memberData}
											position={'副召'}
											inBreakPoint={inBreakPoint}
										/>
									</div>
								) : (
									<div
										className={inBreakPoint ? style.flexHalf : style.lgFlexHalf}
									>
										<PositionRow
											members={memberData}
											position={'部長'}
											inBreakPoint={inBreakPoint}
										/>
										<div style={{ height: '15px' }}></div>
										<PositionRow
											members={memberData}
											position={'組員'}
											inBreakPoint={inBreakPoint}
										/>
									</div>
								)}
							</div>
						),
					};
				})}
				onChange={(key) => setCurDepartment(key)}
			></Tabs>
			<div
				className={
					inBreakPoint ? style.carouelContainer : style.lgcarouelContainer
				}
			>
				<ImgCarousel
					imgList={teamImages[curDepartment]}
					inBreakPoint={inBreakPoint}
				/>
			</div>
		</div>
	);
};
export default MemberTab;
