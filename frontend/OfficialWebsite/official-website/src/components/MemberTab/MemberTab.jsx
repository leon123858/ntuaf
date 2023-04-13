import React, { useContext, useState, useEffect } from 'react';
import style from './MemberTab.module.css';
import { Tabs } from 'antd';
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
	[DEPARTMENT.核心團隊]:
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	[DEPARTMENT.公關部]:
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	[DEPARTMENT.策展部]:
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
	[DEPARTMENT.行政部]:
		'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	[DEPARTMENT.設計部]:
		'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
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

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
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
				size='large'
				items={departmentNames.map((departmentName, i) => {
					return {
						label: departmentName,
						key: departmentName,
						children: (
							<div
								className={inBreakPoint ? style.department : style.lgDepartment}
							>
								<img
									alt='team img'
									src={teamImages[departmentName]}
									className={inBreakPoint ? style.img : style.lgImg}
								/>
								{curDepartment === '核心團隊' ? (
									<div>
										<PositionRow members={memberData} position={'總召'} />
										<PositionRow members={memberData} position={'副召'} />
									</div>
								) : (
									<div>
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
		</div>
	);
};
export default MemberTab;
