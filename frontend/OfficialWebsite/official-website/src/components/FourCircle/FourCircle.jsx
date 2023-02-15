import Card from "./Card.jsx"
import styles from "./FourCircle.module.css"
const contents = [
    {
        title: "起",
        content: "毀滅與混沌",
        discription:"discription for 起",
        activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
    },
    {
        title: "承",
        content: "毀滅與混沌",
        discription:"discription for 承",
        activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
    },
    {
        title: "轉",
        content: "毀滅與混沌",
        discription:"discription for 轉",
        activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
    },
    {
        title: "合",
        content: "毀滅與混沌",
        discription:"discription for 合",
        activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
    },
]
const FourCircle = () => {
    return (
        <>
            <div className={styles.cardWrapper}>
                {contents.map((content, index) => {
                    return (
                        <Card content={content} />
                    )
                })}
            </div>
            
        </>)
}


export default FourCircle