import styles from "./FrontCard.module.css"

const BackCard = ({title, content, discription, setFlip})=>{
    return (<div className={styles.frontCardWrapper}>
        <div className={styles.title}>{"title"}</div>
        <div className={styles.content}>{"content"}</div>
        <div  className={styles.condiscriptiontent}>{"discription"}</div>
        <div onClick={()=>{setFlip(prev=>!prev)}}>back點擊看更多- </div>
    </div>)
}
export default BackCard