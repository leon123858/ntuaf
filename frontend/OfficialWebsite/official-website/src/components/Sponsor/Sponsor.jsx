import styles from "./Sponsor.module.css"
import { useContext } from "react";
import { BreakPointContext } from "../../useBreakPoint";
const Sponsor = ()=>{
	const { inBreakPoint } = useContext(BreakPointContext);
    
    return (
    <div className={styles.sponsorWrapper}>
        <h2 className={inBreakPoint? styles.title : styles.lgTitle}>合作企業</h2>
        <div className={styles.iconsWrapper}>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>
            <div className={inBreakPoint? styles.iconWrapper:styles.lgIconWrapper}>CIS</div>

        </div>
    </div>)
}
export default Sponsor