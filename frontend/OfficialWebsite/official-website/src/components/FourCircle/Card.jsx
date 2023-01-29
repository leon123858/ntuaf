import styles from "./Card.module.css"
import { Button, Modal } from 'antd';
import { useState } from 'react';
import DoubleCard from "./DoubleCard.jsx"
const Card = ({ title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {

        setIsModalOpen(true);
    };
    const handleOk = () => {
        console.log("ok")
        setIsModalOpen(prev => {
            console.log(prev);
            return (false)
        });

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={styles.cardWrapper} onClick={showModal}>
            <div className={styles.circle}>
                <div className={styles.circleText}>{title}</div>
            </div>
            {/* <div>{content}</div> */}
            {/* <Modal zIndex={5} maskClosable={false} centered={true} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            
        </Modal> */}
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{title}</p>

            </Modal>

        </div>)
}


export default Card