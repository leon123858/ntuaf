import { Image } from 'antd';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div>
			<Link className={styles.link} to={'/'}>
				<Image
					className={styles.logo}
					preview={false}
					width={'50px'}
					height={'50px'}
					src='/ntuaf1.png'
				></Image>
			</Link>
		</div>
	);
};
export default Logo;
