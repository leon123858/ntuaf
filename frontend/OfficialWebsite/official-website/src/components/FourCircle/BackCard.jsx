import styles from "./FrontCard.module.css"
import {CloseOutlined} from "@ant-design/icons"
const BackCard = ({BackCardContent, setFlip, closeModel})=>{
    const handleFlip = () => {
        setFlip((prev) => {
            return !prev
        })
    }
    return (<div className={styles.frontCardWrapper}>
        <div className={styles.title}>{BackCardContent.title}</div>
        <div className={styles.closeIconWrapper}><CloseOutlined style={{fontSize:"20px", padding:"20px"}} onClick={()=>{closeModel()}}/></div>
        <div className={styles.textWrapper}>
            <div className={styles.content}>{BackCardContent.content}</div>
            <div className={styles.condiscriptiontent}>{BackCardContent.discription}</div>
            <div onClick={handleFlip}>Back </div>
        </div>
    </div>)
}
export default BackCard