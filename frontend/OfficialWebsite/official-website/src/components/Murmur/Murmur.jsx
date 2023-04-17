import styles from "./Murmur.module.css"
import { useContext } from "react"
import { BreakPointContext } from "../../useBreakPoint"

const Murmur = () => {
    const { inBreakPoint } = useContext(BreakPointContext)

    return (
        <div className={styles.murmurWrapper}>
            <div className={inBreakPoint ? styles.shortMurmur : styles.lgShortMurmur}>
                <span >
                    人生即莫比烏斯環，向未來疾馳亦是洄溯至過往，沈澱靈魂便是重生。
                </span>
            </div>
            <div className={styles.midMurmur} style={{display:inBreakPoint?"":"none"}}>
                <div>臺大藝術季介紹</div>
                自1995年始以社團聯展形式辦理的學生活動，到如今由學生自組之籌備團隊與學校單位協力運作策劃，
                囊括展覽、各式演出、講座、工作坊等項目的大型慶典，臺大藝術季迄今已有二十八年的歷史。在這二十八年之中，
                學生團隊每年皆提出不同的核心主題，並藉由理念的創造、相應議題的探索，衍生出多樣的藝術表現。試圖藉此，
                讓校內外的學生及團體在藝術季建立的平台上進行合作，發掘校園各處藝術活動能夠發生的地點、學生生活中悄然的存在的靈感與訴求。
            </div>

            <div className={inBreakPoint ? styles.longMurmur : styles.lgLongMurmur}>
                <div className={inBreakPoint ? styles.logoWrapper : styles.lgLogoWrapper}>
                    <img src={"../../about/洄logo.svg"} style={{width:"100%"}} alt="" />
                </div>
                <p style={{ textAlign: inBreakPoint?"left":"center" }}>
                本屆藝術季《洄 Reviver》以「永續」為核心，除了環境面的永續之外，亦以藝術的形式探索時間面的永續。
                {inBreakPoint?<><br></br><br></br></>:""}
                於你而言，「過去與未來」、「生存與死亡」、「瞬間與不朽」是無法改變的事實，抑或是可以被重新定義的概念呢？
                    <br></br>
                    <br></br>
                </p>
                <p style={{ textAlign: inBreakPoint?"left":"center" }}>
                在漫長的時間軸上，我們究竟是穿梭於不同時空的靈魂，還是被時間束縛與禁錮的區區個體？
                {inBreakPoint?<><br></br><br></br></>:""}

                洄將「永續」分為四個階段：毀滅與混沌、動盪與追尋、時間與回溯、未來與重生，
                讓大家透過藝術展覽與實作活動，探索自我與「永續」的關係。
                    <br></br>
                    <br></br>
                </p>
                <p style={{ textAlign: inBreakPoint?"left":"center"  }}>
                    願在當中的某個瞬間，你會找「洄」自己。
                </p>
            </div>
        </div>
    )
}
export default Murmur
