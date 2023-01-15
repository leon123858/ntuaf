import style from "./OneSideCard.module.css"

const OneSideCard = ({cardContent}) => {
    return (
        <div className={style.oneSideCard}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
            <div className={style.imageWrapper}>
                <img src='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
                alt="here"></img>
            </div>
            
            <h4>{cardContent.header}</h4>
            <p className={style.disc}>{cardContent.content} {cardContent.index}</p>
            {/* </a> */}
        </div>
    )
}
export default OneSideCard