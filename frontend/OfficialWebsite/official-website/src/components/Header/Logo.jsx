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
					width={'125px'}
					height={'50px'}
					src='/ntuaf1.svg'
				></Image>
			</Link>
		</div>
	);
};
export default Logo;
