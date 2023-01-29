import Card from "./Card.jsx"
import styles from "./FourCircle.module.css"
import { useState } from 'react';
import {FrontCard} from "./FrontCard.jsx"
import { Button, Modal } from 'antd';
import DoubleCard from "./DoubleCard.jsx"
const contents = [
    {
        title: "起",
        content: "毀滅與混沌"
    },
    {
        title: "起",
        content: "毀滅與混沌"
    },
    {
        title: "起",
        content: "毀滅與混沌"
    },
    {
        title: "起",
        content: "毀滅與混沌"
    },
]
const FourCircle = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = () => {
    //     setIsModalOpen(true);
    //   };
    //   const handleOk = () => {
    //     setIsModalOpen(false);
    //   };
    //   const handleCancel = () => {
    //     setIsModalOpen(false);
    //   };
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const showModal = () => {
    //     setIsModalOpen(true);
    //     // console.log("helo")
    // };
    // const handleOk = () => {
    // setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    // setIsModalOpen(false);
    // };
    return (
        <>
            <div className={styles.cardWrapper}>
                {contents.map((e, index) => {
                    return (
                        <Card title={e.title} content={e.content} />
                    )
                })}
            </div>
                  {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
                         <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
            
        </>)
}


export default FourCircle