import styles from "./FrontCard.module.css"
import {CloseOutlined} from "@ant-design/icons"
const FrontCard = ({ FrontCardContent, setFlip, closeModel}) => {
    const handleFlip = () => {
        setFlip((prev) => {
            return !prev
        })
    }
    return (<div className={styles.frontCardWrapper}>
        
        <div className={styles.title}>{FrontCardContent.title}</div>
        <div className={styles.closeIconWrapper}><CloseOutlined style={{fontSize:"20px", padding:"20px"}} onClick={()=>{closeModel()}}/></div>
        <div className={styles.textWrapper}>
            <div className={styles.content}>{FrontCardContent.content}</div>
            <div className={styles.condiscriptiontent}>{FrontCardContent.discription}</div>
            <div onClick={handleFlip}>front點擊看更多- </div>
        </div>

    </div>)
}
export default FrontCard