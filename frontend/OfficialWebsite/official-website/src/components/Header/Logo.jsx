import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = ()=>{
    return(<div className={styles.logo}><Link className={styles.link} to={'/'}>Logo</Link></div>)
}
export default Logo