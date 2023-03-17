import styles from './Card.module.css';
import { Modal } from 'antd';
import {useState, useContext} from "react"
import { BreakPointContext } from '../../useBreakPoint';
import DoubleCard from './DoubleCard.jsx';
const Card = ({ content, index }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const cardWidth =  326
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen((prev) => false);
	};
	return (
		<div className={styles.cardWrapper}>
			<div
				className={styles.circle}
				onClick={() => {
					showModal();
				}}
			>
				<img src={content.iconTextUrl} alt={"loading"}></img>
			</div>
			{inBreakPoint?
				<Modal
				title='Basic Modal'
				style={{ pointerEvents: 'auto' }}
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
			</Modal>:
				<Modal
				title='Basic Modal'
				style={{ pointerEvents: 'auto', right: `${1.5*cardWidth-index*cardWidth}px` }}
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
			}

		</div>
	);
};

export default Card;
