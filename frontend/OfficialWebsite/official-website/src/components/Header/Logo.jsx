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
					width={'154px'}
					height={'49.5px'}
					src='/ntuaf1.svg'
				/>
			</Link>
		</div>
	);
};
export default Logo;
