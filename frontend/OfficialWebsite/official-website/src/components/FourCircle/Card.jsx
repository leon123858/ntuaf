import styles from "./Card.module.css";
import { Modal } from "antd";
import { useState, useContext } from "react";
import { BreakPointContext } from "../../useBreakPoint";
import DoubleCard from "./DoubleCard.jsx";

const Card = ({ content, index }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const [flip, setFlip] = useState(false)
	const cardWidth = window.innerWidth / 4 - 30;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen((prev) => false);
		setFlip(false)
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
					>
					</div>
					<Modal
						title="Basic Modal"
						style={{
							pointerEvents: "auto",
							top:"150px",
						}}
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
				<div className={styles.lgCardWrapper}	onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
					{
						isHover ?
							<>
								<div
									className={styles.lgCircle}
									onClick={() => {
										showModal();
									}}
									style={{ backgroundImage: `url("${content.iconTextShadowUrl}")` }}
								>
								</div>					
								<div
									className={styles.lgCircle}
									onClick={() => {
										showModal();
									}}
									style={{ backgroundImage: `url("${content.iconTextShadowUrl}")` }}
								>
								</div>
							</>
							:
							<div
								className={styles.lgCircle}
								onClick={() => {
									showModal();
								}}
								style={{ backgroundImage: `url("${content.iconTextShadowUrl}")` }}

							>
							</div>
					}
					<Modal
						title="Basic Modal"
						style={{
							pointerEvents: "auto",
							right: `${1.5 * cardWidth - index * cardWidth}px`,
							top:"180px",
						}}
						width={326}
						open={isModalOpen}
						onCancel={handleCancel}
						modalRender={() => (
							<DoubleCard
								FrontCardContent={content}
								BackCardContent={content}
								closeModel={handleCancel}
								flip={flip}
								setFlip={setFlip}
							/>
						)}
						flip={flip}
						setFlip={setFlip}
						mask={false}
					>
						<p>{content.title}</p>
					</Modal>
				</div>
			)}
		</>
	);
};

export default Card;
