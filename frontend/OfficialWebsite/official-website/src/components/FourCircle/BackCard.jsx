import styles from "./BackCard.module.css"
const BackCard = ({BackCardContent, setFlip, closeModel})=>{
    const handleFlip = () => {
        setFlip((prev) => {
            return !prev
        })
    }
    //? the size of card is different
    return (
    <div className={styles.backCardWrapper} style={{backgroundImage:`url("${BackCardContent.backCardBackgroundUrl}")` }}>
        <div className={styles.title} style={{backgroundImage:`url("${BackCardContent.iconUrl}")` }} ></div>
        {/* <div className={styles.closeIconWrapper}><CloseOutlined style={{fontSize:"20px", padding:"20px"}} onClick={()=>{closeModel()}}/></div> */}
        {/* <div className={styles.textWrapper}>
            <div className={styles.content}>{BackCardContent.content}</div>
            <div className={styles.imgWrapper}>IMG</div>
        </div> */}
        <div className={styles.flipButton} onClick={handleFlip}>Back </div>
        
    </div>)
}
export default BackCard