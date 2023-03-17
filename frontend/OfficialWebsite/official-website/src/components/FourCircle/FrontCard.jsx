import styles from "./FrontCard.module.css"
// import {CloseOutlined} from "@ant-design/icons"
const FrontCard = ({ FrontCardContent, setFlip, closeModel}) => {
    // console.log("FrontCardContent", FrontCardContent)
    const handleFlip = () => {
        setFlip((prev) => {
            return !prev
        })
    }
    return (
    <div className={styles.frontCardWrapper} style={{backgroundImage:`url("${FrontCardContent.frontCardBackgroundUrl}")` }}>
        <div className={styles.title} style={{backgroundImage:`url("${FrontCardContent.iconTextUrl}")` }} >
            {/* <div className={styles.iconWrapper} style={{backgroundImage:`url("${FrontCardContent.iconUrl}")` }}></div> */}
            {/* <img src={FrontCardContent.iconUrl}></img> */}
        </div>
        {/* <div className={styles.closeIconWrapper}><CloseOutlined style={{fontSize:"20px", padding:"20px"}} onClick={()=>{closeModel()}}/></div> */}
        <div className={styles.discription}>{FrontCardContent.discription}</div>
        {/* <div className={styles.textWrapper}> */}
            {/* <div className={styles.content}>{FrontCardContent.content}</div> */}
            
            
        {/* </div> */}
        <div className={styles.flipButton} onClick={handleFlip}>front點擊看更多- </div>

    </div>)
}
export default FrontCard