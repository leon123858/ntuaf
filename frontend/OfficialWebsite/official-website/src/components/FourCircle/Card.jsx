import styles from "./Card.module.css"
import { Button, Modal } from 'antd';
import { useState } from 'react';
import DoubleCard from "./DoubleCard.jsx"
import FrontCard from "./FrontCard.jsx"
import BackCard from "./BackCard.jsx"
const Card = ({ content }) => {
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
        setIsModalOpen(prev => false);
    };
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.circle}>
                <div className={styles.circleText} onClick={showModal}>{content.title}</div>
            </div>
            {/* <div>{content}</div> */}
            {/* <Modal zIndex={5} maskClosable={false} centered={true} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            
        </Modal> */}
            <Modal title="Basic Modal" style={{pointerEvents:"auto"}} open={isModalOpen} onCancel={handleCancel} modalRender={()=><DoubleCard FrontCardContent={content} BackCardContent={content} closeModel={handleCancel}/>}>
                <p>{content.title}</p>
            </Modal>

        </div>)
}


export default Card