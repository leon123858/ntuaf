import styles from "./FrontCard.module.css"

const FrontCard = ({title, content, discription, setFlip})=>{
    const handleFlip = ()=>{
        setFlip((prev)=>{
            console.log(prev)
            return !prev})
        console.log("handleFlip")
    }
    return (<div className={styles.frontCardWrapper}>
        <div className={styles.title}>{"title"}</div>
        <div className={styles.content}>{"content"}</div>
        <div  className={styles.condiscriptiontent}>{"discription"}</div>
        <div onClick={handleFlip}>front點擊看更多- </div>
    </div>)
}
export default FrontCard