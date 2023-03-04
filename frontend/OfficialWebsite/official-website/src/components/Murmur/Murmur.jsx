import styles from "./Murmur.module.css"
const Murmur=()=>{
    return (
        <div className={styles.murmurWrapper}>
            <div className={styles.logoWrapper}>log component</div>
            <div className={styles.shortMurmur}>
            <span style={{fontSize: 35}}>
            人生即莫比烏斯環，向未來疾馳亦是洄溯至過往，沈澱靈魂便是重生。
            </span>
            </div>
            <div className={styles.longMurmur}>
            <span style={{fontSize: 20}}>
            本屆藝術季以「永續」為核心，除了環境面的永續之外，亦以藝術的形式探索時間面的永續。
            <br></br>
            <br></br>
            於你而言「過去與未來」、「生存與死亡」、「瞬間與不朽」是無法改變的事實，抑或是可以被重新定義的概念呢？
            <br></br>
            <br></br>
            在漫長的時間軸上，我們究竟是穿梭於不同時空的靈魂，還是被時間禁錮的個體？
            <br></br>
            <br></br>
            洄將「永續」分為四個階段：毀滅與混沌、動盪與追尋、時間與回溯、未來與重生，
            讓大家透過藝術展覽與實作活動，探索自我與「永續」的關係。
            <br></br>
            <br></br>
            願在當中的某個瞬間，你會找「洄」自己。
            </span>
            </div>
            </div>
    )
    }
export default Murmur