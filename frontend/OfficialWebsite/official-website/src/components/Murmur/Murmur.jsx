import styles from "./Murmur.module.css"
const Murmur=()=>{
    return (
        <div className={styles.murmurWrapper}>
            <div className={styles.logoWrapper}>log component</div>
            <div className={styles.shortMurmur}>人生blablabla</div>
            <div className={styles.longMurmur}>本屆blablabla</div>
        </div>
    )
    }
export default Murmur