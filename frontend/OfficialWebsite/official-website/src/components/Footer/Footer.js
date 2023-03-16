import styles from './Footer.module.css';
import Logo from '../Header/Logo';
import { Image } from 'antd';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';

const Footer = () => {
	const { inBreakPoint } = useContext(BreakPointContext);

	function topFunction() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	return (
		<footer className={(inBreakPoint) ? styles.footerWrapper  : styles.lgFooterWrapper} style={(inBreakPoint) ? { background: 'no-repeat url(lgFooter.png)'} : { background: 'no-repeat url(lgFooter.png)'}}>
			<svg 
				width="40" 
				height="43" 
				viewBox="0 0 40 43" 
				fill="none" 
				xmlns="http://www.w3.org/2000/svg" 
				className={styles.top}
				onClick={topFunction}
			>
				<path d="M19.5366 2V43M19.5366 2L1 17.8182M19.5366 2L39 17.8182" stroke="url(#paint0_linear_1361_182)" strokeWidth="2"/>
				<linearGradient id="paint0_linear_1361_182" x1="20" y1="2" x2="20" y2="43" gradientUnits="userSpaceOnUse">
				<stop offset="0.166667" stopColor="#E73273"/>
				<stop offset="0.578125" stopColor="#A9CF59"/>
				<stop offset="0.950456" stopColor="#25499D"/>
				</linearGradient>
			</svg>

			<div className={(inBreakPoint) ? styles.title : styles.lgTitle}>
				<Logo />
				<Image
					className={styles.logo}
					preview={false}
					width={'100px'}
					height={'100px'}
					src='/ntuaf2.svg'
				></Image>
			</div>

			<div className={(inBreakPoint) ? styles.infoWrapper : styles.lgInfoWrapper}>
				<div style={{ marginRight: 32 }}>
					<h3 style={{ fontSize: 16, margin: '0 0 0 0' }}>聯絡我們</h3>
					<p style={{ fontSize: 14, marginBottom: 6 }}>台北市大安區羅斯福路四段1號</p>
					<div style={{ display: 'flex', alignItems: 'center', fontSize: 14, marginBottom: 3 }}>
						<svg width="23" height="14" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 10 }}>
							<path d="M22.2194 1H3.78063C2.24493 1 1 2.09006 1 3.43471V13.6764C1 15.0211 2.24493 16.1111 3.78063 16.1111H22.2194C23.7551 16.1111 25 15.0211 25 13.6764V3.43471C25 2.09006 23.7551 1 22.2194 1Z" stroke="white" strokeMiterlimit="10"/>
							<path d="M1.88889 1.88889L10.3575 9.34125C11.8683 10.6708 14.1317 10.6708 15.6425 9.34125L24.1111 1.88889" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M9.88889 9L1.88889 15.6667M15.6667 9L24.1111 15.6667" stroke="white"/>
						</svg>
						<span>ntuartfest@gmail</span>
					</div>
				</div>

				<div className={(inBreakPoint) ? styles.iconGroup : styles.lgIconGroup}>
					<a href='https://www.facebook.com/NTUartfest' style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.21))' }}>
						<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 483" fill='#FFF'>
							<path d="M281,443.36c94.57-22.16,165-107,165-208.36,0-118.19-95.81-214-214-214S18,116.81,18,235c0,112.47,86.76,204.66,197,213.33l.37-149.75L161,298.42V236.76l54-.48,1-45.1S205,85,342,112v51.45H320.31S277,160.11,281,206.22l-.26,30.54h58.65L330,298.42H280.74L281,442v1" stroke="white"/>
						</svg>
					</a>
					<a href='www.instagram.com/ntuartfest' style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.21))' }}>
					<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 483" fill='#FFF'>
						<g>
							<circle cx="232.5" cy="243.5" r="66.75"/>
							<path d="M308.06,43.26h-160c-68,0-118.35,46.6-118.35,132.23V316.54C29.74,400.92,82.63,445,156.94,445H309.32C387.4,445,434,394.62,434,317.8V170.46C434,92.37,384.88,40.74,308.06,43.26Zm-74.3,303.51A103.27,103.27,0,1,1,337,243.5,103.28,103.28,0,0,1,233.76,346.77ZM340.81,160.38a23.93,23.93,0,1,1,23.92-23.93A23.93,23.93,0,0,1,340.81,160.38Z"/>
						</g>
					</svg>
					</a>
					<a href='https://lin.ee/ymEZTbB' style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.21))' }}>
						<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="40 50 380 360" fill='#FFF'>
							<path d="M235.75,90.5C143.38,90.5,68.5,152.36,68.5,228.66c0,62.46,50.17,115.24,119,132.34q8.43,2.08,17.21,3.45h0q6.45,1,13.08,1.58c6.82,3.42,6.28,10.81,6.28,13.89,0,10.18-21.82,56.71,32,18.9,0,0,64-39.27,93.08-68.35l8.73-7.27C384.09,297,403,269,403,228.66,403,152.36,328.12,90.5,235.75,90.5ZM176.12,269.05a3.2,3.2,0,0,1-3.24,3.2l-47.58-.64a3,3,0,0,1-2.92-3v-74a3,3,0,0,1,3.05-3h12.46a3.14,3.14,0,0,1,3.14,3.13l.19,58.63H172.9a3.22,3.22,0,0,1,3.22,3.22Zm28.36-1.28a3.8,3.8,0,0,1-3.8,3.8H189.37a3.8,3.8,0,0,1-3.8-3.8V195.43a3.8,3.8,0,0,1,3.8-3.8h11.31a3.8,3.8,0,0,1,3.8,3.8Zm81.45.85a3,3,0,0,1-2.95,2.95H271a5.67,5.67,0,0,1-4.63-2.38c-10.49-14.6-26.67-36.28-31-42a.59.59,0,0,0-1.07.36V256.3l-.22,12.39a2.93,2.93,0,0,1-2.93,2.88H218.94a2.82,2.82,0,0,1-2.82-2.82V194.36a2.73,2.73,0,0,1,2.73-2.73h12.4a4.63,4.63,0,0,1,3.67,1.82c17,22.43,19.89,28.13,25.55,35.21l5.73,8a.86.86,0,0,0,1.55-.5V209.76l.18-15.12a3,3,0,0,1,3-3h11.81a3.15,3.15,0,0,1,3.15,3.14Zm64.41-.12a3,3,0,0,1-3,3.07h-47a2.79,2.79,0,0,1-2.79-2.79V194.35a2.72,2.72,0,0,1,2.72-2.72h47.48a2.68,2.68,0,0,1,2.68,2.68v12.93a2.48,2.48,0,0,1-2.48,2.49H315.23v12.34H347.5a3.08,3.08,0,0,1,3.08,3.07v12.21a2.82,2.82,0,0,1-2.82,2.82H315.23v13.42h32.9a3.33,3.33,0,0,1,3.33,3.24Z"/>
						</svg>
					</a>
					<a href='https://www.youtube.com/@ntuartfest' style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.21))' }}>
						<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="80 90 330 300" fill='#FFF'>
							<path d="M403,172c-12-31-39-31-39-31-113-10-240,0-240,0-37,11-36.6,37.44-36.6,37.44-12.4,69.56,0,149.3,0,149.3C94,365,137,363,137,363c116,10,234-2,234-2,30-8,32.5-31.5,32.5-31.5C416.5,234.5,403,172,403,172ZM213,299.51V203l84.4,48.26Z"/>
						</svg>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
