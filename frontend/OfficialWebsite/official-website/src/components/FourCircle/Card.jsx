import styles from "./Card.module.css"
import { Button, Modal } from 'antd';
import { useState } from 'react';
import DoubleCard from "./DoubleCard.jsx"
const Card = ({ title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
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
        console.log(isModalOpen)
        setIsModalOpen(prev => {
            console.log(prev);
            return (false)
        });
    };
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.circle}>
                <div className={styles.circleText} onClick={showModal}>{title}</div>
            </div>
            {/* <div>{content}</div> */}
            {/* <Modal zIndex={5} maskClosable={false} centered={true} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            
        </Modal> */}
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} modalRender={()=><DoubleCard/>}>
                <p>{title}</p>
            </Modal>

        </div>)
}


export default Card