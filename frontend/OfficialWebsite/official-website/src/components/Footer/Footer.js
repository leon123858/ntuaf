import styles from "./Footer.module.css"
import {InstagramOutlined, FacebookOutlined} from '@ant-design/icons';

const Footer = ()=>{

    return (
        <div className={styles.footerWrapper}>
            <div className={styles.title}>
                <span className={styles.logo}>LOGO</span>
                <h2>台大藝術季28th</h2>
                
            </div>
            <hr></hr>
            <div className={styles.infoWrapper}>
                <div>
                <h3>聯絡我們</h3>
                <p>羅斯福路</p>
                <p>ntuartfest@gmail</p>
                </div>
                <div className={styles.iconGroup}>
                    <a href="https://www.instagram.com/"><InstagramOutlined/></a>
                    <a href="https://www.facebook.com/"><FacebookOutlined /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer