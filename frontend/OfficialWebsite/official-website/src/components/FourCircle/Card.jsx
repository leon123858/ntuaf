import styles from "./Card.module.css"
import { Modal } from 'antd';
import { useState } from 'react';
import DoubleCard from "./DoubleCard.jsx"
const Card = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(prev => false);
    };
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.circle}>
                <div className={styles.circleText} onClick={showModal}>{content.title}</div>
            </div>
            <Modal title="Basic Modal" style={{pointerEvents:"auto"}} open={isModalOpen} onCancel={handleCancel} modalRender={()=><DoubleCard FrontCardContent={content} BackCardContent={content} closeModel={handleCancel}/>}>
                <p>{content.title}</p>
            </Modal>
        </div>)
}


export default Card