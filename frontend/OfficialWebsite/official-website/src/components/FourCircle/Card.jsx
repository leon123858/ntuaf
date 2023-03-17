import styles from "./Card.module.css";
import { Modal } from "antd";
import { useState, useContext } from "react";
import { BreakPointContext } from "../../useBreakPoint";
import DoubleCard from "./DoubleCard.jsx";
import { Image } from 'antd';
const Card = ({ content, index }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const cardWidth = window.innerWidth/4-30;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen((prev) => false);
	};
	return (
		<div className={styles.cardWrapper}>
			{inBreakPoint ? (
				<div className={styles.cardWrapper}>
					<div
						className={styles.circle}
						onClick={() => {
							showModal();
						}}
					>
						<Image src={content.iconTextUrl} alt={"loading"}
							preview={false}
							fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'>
						</Image>
					</div>
					<Modal
						title="Basic Modal"
						style={{ pointerEvents: "auto" }}
						open={isModalOpen}
						onCancel={handleCancel}
						modalRender={() => (
							<DoubleCard
								FrontCardContent={content}
								BackCardContent={content}
								closeModel={handleCancel}
							/>
						)}
					>
						<p>{content.title}</p>
					</Modal>
				</div>
			) : (
				<div className={styles.cardWrapper}>
					<div
						className={styles.lgCircle}
						onClick={() => {
							showModal();
						}}
					>
						<img src={content.iconTextUrl} alt={"loading"}></img>
					</div>
					<Modal
						title="Basic Modal"
						style={{
							pointerEvents: "auto",
							right: `${1.5 * cardWidth - index * cardWidth}px`,
						}}
						open={isModalOpen}
						onCancel={handleCancel}
						modalRender={() => (
							<DoubleCard
								FrontCardContent={content}
								BackCardContent={content}
								closeModel={handleCancel}
							/>
						)}
					>
						<p>{content.title}</p>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default Card;
