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
            </div>
        </div>
    )
}
export default Sponsor