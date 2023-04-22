import styles from "./Sponsor.module.css"
import { useContext } from "react";
import { BreakPointContext } from "../../useBreakPoint";
const Sponsor = () => {
    const { inBreakPoint } = useContext(BreakPointContext);

    return (
        <div className={inBreakPoint ? styles.sm : styles.lg}>
            <div className={styles.bigContainer}>
                <div className={styles.sponsorWrapper} style={{width:inBreakPoint?"":"40vw"}}>
                    <div className={styles.title}>合辦單位</div>
                    <div className={styles.iconsWrapper} style={{margin:inBreakPoint?"":"0px"}}>
                        <img src="../../about/sponsor/台大系統.png" alt="" className={styles.ntu} />
                        <img src="../../about/sponsor/台大基金會.png" alt="" className={styles.ntuu} />
                    </div>
                </div>
                <div className={styles.sponsorWrapper}>
                    <div className={styles.title}>主要贊助單位</div>
                    <div className={styles.iconsWrapper}>
                        <img src="../../about/sponsor/惜惜康普.png" alt="" className={styles.cc} />
                        <img src="../../about/sponsor/麗陽LOGO 2.png" alt="" className={styles.lee} />
                        <img src="../../about/sponsor/華南銀行.png" alt="" className={styles.bank} />
                        <img src="../../about/sponsor/寶貝.png" alt="" className={styles.bb} />
                    </div>
                </div>
                <div className={styles.words}>
                主辦單位｜第 28 屆臺大藝術季、國立臺灣大學學生事務處活動中心管理組<br/>
                合辦單位｜國立臺灣大學系統、財團法人臺大系統文化基金會<br/>
                指導顧問｜何一梵教授<br/>
                特別感謝｜詹旻華、建中攝影通訊協會（小癆頭）、林冠錚、莊加旭、陳威廷、游蕙畇、顏明柔（依姓氏筆畫排序）
                </div>
            </div>
        </div>
    )
}
export default Sponsor