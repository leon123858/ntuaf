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
	}
	return (
		<div className={styles.footerWrapper} style={{ background: 'url(footer.png)' }}>
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
				<div style={{ color: 'white' }}>
					<h3 style={{ fontSize: 20, marginBottom: 10 }}>聯絡我們</h3>
					<span style={{ fontSize: 16, marginBottom: 6 }}>台北市大安區羅斯福路四段1號</span>
					<span style={{ display: 'flex', alignItems: 'center', fontSize: 16, marginBottom: 3 }}>
						<svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 12 }}>
							<path d="M22.2194 1H3.78063C2.24493 1 1 2.09006 1 3.43471V13.6764C1 15.0211 2.24493 16.1111 3.78063 16.1111H22.2194C23.7551 16.1111 25 15.0211 25 13.6764V3.43471C25 2.09006 23.7551 1 22.2194 1Z" stroke="white" stroke-miterlimit="10"/>
							<path d="M1.88889 1.88889L10.3575 9.34125C11.8683 10.6708 14.1317 10.6708 15.6425 9.34125L24.1111 1.88889" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M9.88889 9L1.88889 15.6667M15.6667 9L24.1111 15.6667" stroke="white"/>
						</svg>
						<span>ntuartfest@gmail</span>
						
					</span>
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
