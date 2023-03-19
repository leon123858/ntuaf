import styles from './Footer.module.css';
import Logo from '../Header/Logo';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';

const Footer = () => {
	const { inBreakPoint } = useContext(BreakPointContext);

	function topFunction() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	return (
		<footer className={(inBreakPoint) ? styles.footerWrapper : styles.lgFooterWrapper} style={(inBreakPoint) ? { background: 'no-repeat url(smFooter.png)'} : { background: 'no-repeat url(lgFooter.png)'}}>
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
				<svg 
					width="100" 
					height="44" 
					viewBox="0 0 160 44" 
					fill="none" 
					xmlns="http://www.w3.org/2000/svg"
					style={{ marginLeft: 12 }}
				>
					<path d="M12.368 17.448L16.664 17.328C17.072 17.64 17.456 17.952 17.744 18.216H12.368V17.448ZM13.328 15.072L13.208 15.168C13.592 15.384 14.048 15.624 14.504 15.888L7.928 15.984C8.456 15.72 8.984 15.408 9.536 15.072H13.328ZM12.368 19.896H19.4V18.216H17.984L19.544 16.92C18.896 16.392 17.936 15.696 16.88 15.072H18.584V13.56H3.224V12.864H18.68V14.664H21.368V11.088H0.68V14.664H3.176V15.072H6.44C5.72 15.432 5.096 15.672 4.808 15.768C4.376 15.936 3.92 16.032 3.56 16.08C3.752 16.584 4.04 17.472 4.136 17.856C4.664 17.688 5.384 17.616 9.488 17.52V18.216H2.912V19.896H9.488V20.664H0.584V22.584H21.512V20.664H12.368V19.896ZM16.16 9H5.84V8.16H16.16V9ZM3.224 6.768V10.392H18.968V6.768H3.224ZM12.368 1.872V0.671999H9.488V1.872H0.416V3.624H9.488V4.416H2.36V6.072H19.712V4.416H12.368V3.624H21.656V1.872H12.368ZM55.8935 10.056V7.104H46.4615C46.7015 4.872 46.7255 2.664 46.7495 0.696H43.6295C43.6055 2.664 43.6295 4.848 43.3895 7.104H34.6535V10.056H42.9095C41.9735 14.184 39.6935 18.168 34.1975 20.616C35.0375 21.216 35.8775 22.248 36.3335 23.04C41.4215 20.592 44.0135 16.848 45.3095 12.84C47.1815 17.472 49.9655 20.976 54.3095 23.016C54.7655 22.2 55.7015 20.928 56.4215 20.328C51.9335 18.504 49.0295 14.736 47.4455 10.056H55.8935ZM81.995 4.728H84.803V3.96H90.131V1.992H84.803V0.671999H81.995V1.992H79.907V3.96H81.995V4.728ZM74.123 4.728H76.883V3.96H79.187V1.992H76.883V0.671999H74.123V1.992H68.867V3.96H74.123V4.728ZM75.107 20.88C75.899 20.448 76.691 20.016 77.459 19.512H83.075L82.283 19.968C82.715 20.136 83.171 20.376 83.603 20.64L75.107 20.88ZM68.675 19.512H73.667C72.779 20.064 71.939 20.472 71.555 20.616C70.931 20.904 70.451 21.096 69.947 21.168C70.235 21.672 70.595 22.632 70.739 23.04C71.867 22.752 73.427 22.704 86.171 22.248C86.651 22.608 87.035 22.968 87.371 23.28L89.339 22.032C88.451 21.264 86.963 20.28 85.499 19.512H90.179V17.88H68.675V19.512ZM71.723 15.504V17.136H87.395V15.504H71.723ZM85.739 8.4V11.424C85.307 11.064 84.755 10.704 84.131 10.368C84.323 9.696 84.395 9.024 84.443 8.4H85.739ZM88.259 12.984C88.163 12.984 88.091 12.96 88.043 12.864C87.995 12.792 87.995 12.552 87.995 12.12V6.408H84.491V4.944H82.379V6.408H79.931V8.4H82.307C82.283 8.688 82.235 9 82.163 9.312C81.635 9.072 81.131 8.856 80.627 8.664L79.403 10.2C80.051 10.464 80.747 10.8 81.443 11.184C80.987 11.928 80.363 12.672 79.451 13.368V13.2C78.131 13.272 76.763 13.344 75.491 13.392V12.72H78.635V11.328H75.491V10.728C75.731 10.848 76.043 10.896 76.451 10.896H77.819C78.251 10.896 78.755 10.872 78.995 10.8C78.947 10.368 78.923 9.936 78.899 9.528C78.611 9.6 78.059 9.624 77.771 9.624H76.907C76.571 9.624 76.547 9.48 76.547 9.12V8.904H79.499V7.464H75.491V6.792H78.419V5.4H75.491V4.8H73.091V5.4H70.163V6.792H73.091V7.464H69.107V8.904H71.411C71.051 9.528 70.259 9.864 68.579 10.08C68.939 10.344 69.371 10.968 69.515 11.352C71.819 10.92 72.827 10.176 73.211 8.904H74.867V9.096C74.867 9.504 74.891 9.864 74.987 10.128H73.091V11.328H70.019V12.72H73.091V13.512C71.555 13.584 70.115 13.632 68.963 13.68L69.083 15.288C71.819 15.168 75.659 14.928 79.427 14.664V14.424C79.811 14.76 80.147 15.096 80.363 15.384C81.803 14.472 82.715 13.44 83.339 12.336C83.891 12.696 84.347 13.032 84.683 13.368L85.739 11.976V12.144C85.739 13.584 85.859 14.016 86.219 14.4C86.579 14.76 87.107 14.904 87.635 14.904H88.619C88.979 14.904 89.435 14.832 89.699 14.664C90.011 14.472 90.227 14.208 90.371 13.848C90.515 13.488 90.611 12.504 90.635 11.664C90.107 11.496 89.483 11.16 89.099 10.824C89.075 11.592 89.051 12.192 89.003 12.456C88.955 12.72 88.907 12.864 88.835 12.912C88.787 12.96 88.667 12.984 88.571 12.984H88.259ZM124.561 2.472H118.849V4.992H124.561V2.472ZM118.753 4.8C118.369 3.984 117.553 2.712 116.809 1.8L115.081 2.736C115.801 3.696 116.569 5.016 116.905 5.832L118.753 4.8ZM106.465 0.696C105.721 2.232 104.089 4.152 102.601 5.352C103.057 5.832 103.729 6.888 104.065 7.464C105.889 6.024 107.809 3.72 109.057 1.584L106.465 0.696ZM109.537 10.2C109.513 14.112 109.417 16.44 108.073 17.952C108.553 18.312 109.177 19.104 109.417 19.608C111.265 17.784 111.529 14.76 111.529 10.2H109.537ZM118.249 18.936C118.633 18.936 118.969 18.936 119.257 18.792C119.185 18.336 119.113 17.4 119.065 16.872C118.825 16.944 118.513 16.992 118.273 16.992H117.721C117.577 16.992 117.577 16.8 117.577 16.152V10.224H115.537V16.128C115.537 18.216 115.897 18.936 117.793 18.936H118.249ZM124.921 8.232H118.345V6.288H114.745V0.719999H112.249V6.288H109.081V6.456L106.825 5.712C105.793 8.232 103.969 10.728 102.145 12.336C102.625 12.936 103.441 14.376 103.705 14.952C104.137 14.544 104.593 14.064 105.049 13.536V23.088H107.689V9.864C108.217 9 108.697 8.088 109.081 7.248V8.904H112.249V22.992H114.745V8.904H118.249V10.8H120.337V19.728C120.337 20.016 120.241 20.088 119.929 20.088C119.617 20.112 118.609 20.112 117.649 20.064C118.009 20.88 118.345 22.032 118.417 22.824C120.001 22.824 121.177 22.8 121.993 22.344C122.857 21.864 123.049 21.12 123.049 19.776V10.8H124.897L124.921 8.232ZM149.39 15.912C151.166 15.12 152.942 14.136 154.334 13.152L152.606 11.64L152.006 11.784H142.19C143.774 10.848 145.286 9.768 146.486 8.568V11.208H149.294V8.52C152.174 10.224 155.606 12.48 157.358 14.016L159.206 12.048C157.766 10.848 155.318 9.288 152.966 7.92H158.582V5.52H149.294V3.792C151.862 3.528 154.31 3.192 156.35 2.712L153.998 0.696C150.494 1.512 144.23 1.944 138.806 2.064C139.07 2.64 139.406 3.672 139.454 4.32C141.686 4.272 144.11 4.2 146.486 4.032V5.52H137.39V7.92H143.654C141.734 9.384 139.142 10.656 136.67 11.376C137.246 11.904 138.014 12.888 138.422 13.536C139.478 13.152 140.51 12.72 141.542 12.144V13.992H148.526C147.902 14.328 147.206 14.616 146.558 14.856V16.08H137.294V18.528H146.558V20.16C146.558 20.496 146.438 20.568 145.982 20.592C145.55 20.616 143.822 20.616 142.382 20.544C142.79 21.24 143.222 22.272 143.366 23.016C145.358 23.016 146.894 23.04 147.974 22.656C149.054 22.272 149.39 21.648 149.39 20.256V18.528H158.582V16.08H149.39V15.912ZM6.38575 43H8.14575V37.448C8.14575 36.168 8.00175 34.808 7.90575 33.592H7.98575L9.21775 36.056L13.1217 43H15.0258V31.224H13.2657V36.712C13.2657 37.992 13.4097 39.416 13.5058 40.632H13.4257L12.1937 38.136L8.28975 31.224H6.38575V43ZM22.1358 43H23.9918V32.776H27.4638V31.224H18.6798V32.776H22.1358V43ZM35.4214 43.208C38.0294 43.208 39.7894 41.784 39.7894 37.944V31.224H37.9974V38.072C37.9974 40.728 36.9094 41.592 35.4214 41.592C33.9494 41.592 32.8934 40.728 32.8934 38.072V31.224H31.0374V37.944C31.0374 41.784 32.8134 43.208 35.4214 43.208ZM51.4055 38.184L51.8855 36.6C52.2695 35.32 52.6375 34.024 52.9735 32.68H53.0375C53.4055 34.008 53.7575 35.32 54.1575 36.6L54.6215 38.184H51.4055ZM56.0615 43H58.0295L54.1255 31.224H51.9815L48.0775 43H49.9655L50.9735 39.64H55.0695L56.0615 43ZM61.0226 43H62.8466V37.512C63.4066 36.12 64.2706 35.624 64.9906 35.624C65.3426 35.624 65.5666 35.672 65.8706 35.768L66.2066 34.168C65.9346 34.04 65.6466 33.976 65.2146 33.976C64.2706 33.976 63.3426 34.648 62.7186 35.784H62.6706L62.5266 34.2H61.0226V43ZM72.1295 43.208C72.7695 43.208 73.3615 43.048 73.8575 42.888L73.5215 41.528C73.2655 41.64 72.8815 41.736 72.5775 41.736C71.6655 41.736 71.2975 41.192 71.2975 40.136V35.672H73.5855V34.2H71.2975V31.768H69.7455L69.5375 34.2L68.1775 34.296V35.672H69.4575V40.12C69.4575 41.976 70.1455 43.208 72.1295 43.208ZM77.2733 43H79.1293V37.928H83.4813V36.376H79.1293V32.776H84.2493V31.224H77.2733V43ZM91.1741 43.208C92.3261 43.208 93.3341 42.824 94.1501 42.28L93.5101 41.112C92.8701 41.528 92.1981 41.768 91.4141 41.768C89.8941 41.768 88.8381 40.76 88.6941 39.08H94.4061C94.4541 38.872 94.4861 38.504 94.4861 38.152C94.4861 35.656 93.2381 33.976 90.9021 33.976C88.8381 33.976 86.8861 35.752 86.8861 38.616C86.8861 41.512 88.7901 43.208 91.1741 43.208ZM88.6781 37.816C88.8541 36.264 89.8301 35.416 90.9341 35.416C92.2141 35.416 92.9021 36.296 92.9021 37.816H88.6781ZM100.541 43.208C102.717 43.208 103.885 42.008 103.885 40.536C103.885 38.872 102.525 38.328 101.293 37.864C100.333 37.512 99.421 37.224 99.421 36.472C99.421 35.864 99.869 35.384 100.829 35.384C101.565 35.384 102.189 35.704 102.797 36.152L103.661 35.016C102.941 34.456 101.981 33.976 100.797 33.976C98.861 33.976 97.677 35.08 97.677 36.552C97.677 38.04 99.021 38.664 100.189 39.112C101.149 39.48 102.141 39.832 102.141 40.632C102.141 41.304 101.645 41.816 100.589 41.816C99.645 41.816 98.877 41.432 98.093 40.808L97.229 41.992C98.077 42.696 99.325 43.208 100.541 43.208ZM110.045 43.208C110.685 43.208 111.277 43.048 111.773 42.888L111.437 41.528C111.181 41.64 110.797 41.736 110.493 41.736C109.581 41.736 109.213 41.192 109.213 40.136V35.672H111.501V34.2H109.213V31.768H107.661L107.453 34.2L106.093 34.296V35.672H107.373V40.12C107.373 41.976 108.061 43.208 110.045 43.208ZM119.535 43H127.135V41.432H124.191C123.615 41.432 122.879 41.48 122.271 41.544C124.767 39.16 126.575 36.808 126.575 34.536C126.575 32.408 125.183 31 123.023 31C121.487 31 120.447 31.672 119.439 32.76L120.479 33.784C121.103 33.064 121.871 32.472 122.799 32.472C124.111 32.472 124.799 33.352 124.799 34.632C124.799 36.568 123.007 38.856 119.535 41.928V43ZM134.132 43.208C136.404 43.208 137.94 41.864 137.94 40.12C137.94 38.52 137.012 37.608 135.956 37V36.92C136.692 36.376 137.508 35.352 137.508 34.152C137.508 32.312 136.228 31.032 134.18 31.032C132.244 31.032 130.82 32.232 130.82 34.072C130.82 35.32 131.524 36.2 132.404 36.824V36.904C131.316 37.48 130.292 38.52 130.292 40.072C130.292 41.896 131.924 43.208 134.132 43.208ZM134.9 36.456C133.588 35.944 132.468 35.352 132.468 34.072C132.468 33.016 133.188 32.36 134.148 32.36C135.3 32.36 135.956 33.176 135.956 34.264C135.956 35.048 135.604 35.8 134.9 36.456ZM134.164 41.88C132.9 41.88 131.924 41.064 131.924 39.896C131.924 38.872 132.484 37.992 133.3 37.432C134.9 38.088 136.196 38.632 136.196 40.072C136.196 41.176 135.364 41.88 134.164 41.88ZM143.033 37.816C143.161 37.816 143.299 37.8053 143.449 37.784C143.598 37.7627 143.715 37.736 143.801 37.704V38.344C143.705 38.3867 143.566 38.424 143.385 38.456C143.203 38.488 143.033 38.504 142.873 38.504C142.585 38.504 142.313 38.4613 142.057 38.376C141.811 38.28 141.614 38.1147 141.465 37.88C141.315 37.6453 141.241 37.32 141.241 36.904V33.912H140.441V33.512L141.241 33.176L141.609 32.088H142.153V33.256H143.769V33.912H142.153V36.888C142.153 37.1973 142.233 37.432 142.393 37.592C142.563 37.7413 142.777 37.816 143.033 37.816ZM147.438 33.256C147.438 33.3733 147.433 33.496 147.422 33.624C147.422 33.752 147.412 33.8693 147.39 33.976H147.454C147.572 33.7947 147.721 33.6453 147.902 33.528C148.084 33.4107 148.281 33.3253 148.494 33.272C148.718 33.208 148.953 33.176 149.198 33.176C149.646 33.176 150.02 33.2453 150.318 33.384C150.628 33.512 150.857 33.7147 151.006 33.992C151.156 34.2587 151.23 34.616 151.23 35.064V38.408H150.334V35.112C150.334 34.696 150.228 34.3867 150.014 34.184C149.812 33.9813 149.502 33.88 149.086 33.88C148.67 33.88 148.34 33.9547 148.094 34.104C147.86 34.2427 147.689 34.4507 147.582 34.728C147.486 35.0053 147.438 35.3467 147.438 35.752V38.408H146.526V31.112H147.438V33.256Z" fill="black"/>
				</svg>

			</div>
			<div className={(inBreakPoint) ? styles.infoWrapper : styles.lgInfoWrapper}>
				<div style={{ marginRight: 60 }}>
					<h3 style={{ fontSize: 16, margin: '0 0 0 0' }}>聯絡我們</h3>
					<p style={{ fontSize: 14, margin: '8px 0 6px 0' }}>台北市大安區羅斯福路四段1號</p>
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
