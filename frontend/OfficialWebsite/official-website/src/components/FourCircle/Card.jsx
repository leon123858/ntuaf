import styles from './Card.module.css';
import { Popover, Modal } from 'antd';
import { useState, useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
import DoubleCard from './DoubleCard.jsx';

const Card = ({ content, index }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const [flip, setFlip] = useState(false);
	// const cardWidth = window.innerWidth / 4 - 30;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen((prev) => false);
		setFlip(false);
	};
	const handleMouseEnter = () => {
		setIsHover(true);
	};

	const handleMouseLeave = () => {
		setIsHover(false);
	};
	return (
		<>
			{inBreakPoint ? (
				<div className={styles.cardWrapper}>
					<div
						className={styles.circle}
						onClick={() => {
							showModal();
						}}
						style={{ backgroundImage: `url("${content.iconTextUrl}")` }}
					></div>
					<Modal
						title='Basic Modal'
						style={{ pointerEvents: 'auto' }}
						open={isModalOpen}
						onCancel={handleCancel}
						width={300}
						modalRender={() => (
							<DoubleCard
								FrontCardContent={content}
								BackCardContent={content}
								closeModel={handleCancel}
								flip={flip}
								setFlip={setFlip}
							/>
						)}
					>
						<p>{content.title}</p>
					</Modal>
				</div>
			) : (
				<div
					className={styles.lgCardWrapper}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{isHover ? (
						<>
							<div
								className={styles.lgCircle}
								onClick={() => {
									isModalOpen ? setIsModalOpen(false) : showModal();
								}}
								style={{
									backgroundImage: `url("${content.iconTextShadowUrl}")`,
								}}
							></div>
							<div
								className={styles.lgCircle}
								onClick={() => {
									isModalOpen ? setIsModalOpen(false) : showModal();
								}}
								style={{
									backgroundImage: `url("${content.iconTextShadowUrl}")`,
								}}
							></div>
						</>
					) : (
						<div
							className={styles.lgCircle}
							onClick={() => {
								isModalOpen ? setIsModalOpen(false) : showModal();
							}}
							style={{ backgroundImage: `url("${content.iconTextShadowUrl}")` }}
						></div>
					)}

					<Popover
						align={{
							// points: ['tl', 'tr'], // align top left point of sourceNode with top right point of targetNode
							offset: [65, 0], // the offset sourceNode by 10px in x and 20px in y,
							// targetOffset: ['100%', '40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
						}}
						overlayStyle={{
							width: '23%',
						}}
						overlayInnerStyle={{
							backgroundColor: 'transparent',
							boxShadow: 'none',
						}}
						open={isModalOpen}
						content={() => (
							<DoubleCard
								FrontCardContent={content}
								BackCardContent={content}
								closeModel={handleCancel}
								flip={flip}
								setFlip={setFlip}
							/>
						)}
					></Popover>
				</div>
			)}
		</>
	);
};

export default Card;
