import styles from './Footer.module.css';
import {
	InstagramOutlined,
	FacebookOutlined,
	ArrowUpOutlined,
	YoutubeOutlined,
} from '@ant-design/icons';
import Logo from '../Header/Logo';

const Footer = () => {
	function topFunction() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// document.body.scrollTop = 0; // For Safari
		// document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
	return (
		<div className={styles.footerWrapper}>
			<ArrowUpOutlined
				onClick={topFunction}
				className={styles.top}
				size='big'
			/>
			<div className={styles.title}>
				<Logo />
				<h2>台大藝術季28th</h2>
			</div>
			<hr></hr>
			<div className={styles.infoWrapper}>
				<div>
					<h3>聯絡我們</h3>
					<span>羅斯福路</span>
					<span>ntuartfest@gmail</span>
				</div>
				<div className={styles.iconGroup}>
					<div>
						<a href='https://www.instagram.com/'>
							<InstagramOutlined />
						</a>
						<a href='https://www.facebook.com/'>
							<FacebookOutlined />
						</a>
					</div>
					<div>
						<a href='https://www.facebook.com/'>
							<YoutubeOutlined />
						</a>
						<a
							href='https://www.facebook.com/'
							style={{
								color: '#66FF00',
								border: 'solid 2px #66FF00',
								borderRadius: '5px',
								margin: '0px',
							}}
						>
							LN
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
