import Card from './Card.jsx';
import styles from './FourCircle.module.css';
import { useState, useEffect, useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
const FourCircle = () => {
	const [contents, setContents] = useState([]);
	const { inBreakPoint, breakPoint } = useContext(BreakPointContext);
	const [fourCircleClickable, setFourCircleClickable] = useState(false);
	document.body.style.setProperty('--fourBallOffset', `-${350 / 2}px`);

	window.addEventListener(
		'scroll',
		() => {
			// let tmp = document.getElementsByClassName(styles.lgCardWrapper)[0];
			// let switcher = false;
			let animationPortion = window.pageYOffset / window.innerHeight;

			animationPortion = animationPortion >= 1 ? 0.99 : animationPortion;
			document.body.style.setProperty('--scroll', animationPortion);
			// console.log(animationPortion)
			if (animationPortion === 0.99) {
				if (!fourCircleClickable) {
					setFourCircleClickable(true);
				}
				// console.log("ready", fourCircleClickable)
			} else {
				if (fourCircleClickable) {
					setFourCircleClickable(false);
				}
				// console.log("not ready", fourCircleClickable)
			}

			// console.log(window.pageYOffset, document.body.offsetHeight, window.innerHeight, tmp.offsetParent)
		},
		false
	);
	useEffect(() => {
		setContents([
			{
				title: '起',
				content: '毀滅與混沌',
				discription:
					'相傳世界曾在剎那間毀滅。在新天地尚未形成之際，晝夜未分、萬物融合而模糊不清。周身環繞的萬物雜處，皆以起終點相接的脈絡，交互合成、不斷被推進向前。混沌不清的世界中，你尋向無止境的深邃，彷彿聽見自己的心跳、看見隱約亮起的光⋯⋯',
				activity: [
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
				],
				iconTextUrl: '/ballText1.svg',
				iconTextShadowUrl:
					'/ballTextShadow1.svg',
				frontCardBackgroundUrl: '/cardFront1.svg',
				backCardBackgroundUrl: '/cardBack1.jpeg',
				iconUrl: '/ball1.svg',
			},
			{
				title: '承',
				content: '毀滅與混沌',
				discription:
					'沙漏靜靜流淌，堆疊出回憶的雛形。如水般的時間之流，引領著你回溯。在這趟追尋的旅程裡，你檢視著過往或現在的種種，將它們一一拾掇。亦反芻著內心存在的好與壞，試圖療癒過去，並重塑自身獨有的樣貌。',
				activity: [
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
				],
				iconTextUrl: '/ballText2.svg',
				iconTextShadowUrl:
					'/ballTextShadow2.svg',
				frontCardBackgroundUrl: '/cardFront2.svg',
				backCardBackgroundUrl: '/cardBack2.jpeg',
				iconUrl: '/ball2.svg',
			},
			{
				title: '轉',
				content: '毀滅與混沌',
				discription:
					'求索於萬物中的你，與各式生靈展開互動，形成平衡又不斷打破平衡。你在自然的脈動與循環中，體會著其他生靈與外界的衝突、壓迫與被壓迫的交互關係；這些概念與想法無形間牽動著靈魂，形成領悟與懷疑，領著你朝著未知的方向及領域前行。',
				activity: [
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
				],
				iconTextUrl: '/ballText3.svg',
				iconTextShadowUrl:
					'/ballTextShadow3.svg',
				frontCardBackgroundUrl: '/cardFront3.svg',
				backCardBackgroundUrl: '/cardBack3.jpeg',
				iconUrl: '/ball3.svg',
			},
			{
				title: '合',
				content: '毀滅與混沌',
				discription:
					'你走到了末章。自然、萬物與時間在原點終結，文明的痕跡、繁華或者傷痛，於緩緩的沖刷之中褪去。一切的輻輳點，是過去、也是未來。一切歸零之瞬，你看見了重生的可能正悄然醞釀，新的循環即將展開⋯⋯',
				activity: [
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
					'相應展覽活動',
				],
				iconTextUrl: '/ballText4.svg',
				iconTextShadowUrl:
					'/ballTextShadow4.svg',
				frontCardBackgroundUrl: '/cardFront4.svg',
				backCardBackgroundUrl: '/cardBack4.jpeg',
				iconUrl: '/ball4.svg',
			},
		]);
	}, []);
	return (
		<>
			{inBreakPoint ? (
				<div
					className={styles.cardWrapper}
					style={{
						backgroundImage: `url(https://drive.google.com/uc?id=1JvmPGuuZ5-99q7ByKoZMAPAayF6lWdNn)`,
					}}
				>
					{contents.map((content, index) => {
						return (
							<Card content={content} index={index} />
							// <div style={{width:"150px", height:"150px", border:"solid 2px red"}}></div>
						);
					})}
				</div>
			) : (
				<div
					className={styles.lgBackground}
					style={{
						height: `${breakPoint}px`,
						backgroundImage: `url(https://drive.google.com/uc?id=1JvmPGuuZ5-99q7ByKoZMAPAayF6lWdNn)`,
					}}
				>
					{/* <div className={styles.lgCardWrapper} style={{height:`${breakPoint}px`}}> */}
					<div
						className={`${fourCircleClickable
								? styles.lgCardWrapper
								: `${styles.lgCardWrapper} ${styles.notReady}`
							}`}
						style={{ height: `${breakPoint}px` }}
					>
						{contents.map((content, index) => {
							return <Card content={content} key={index} index={index} />;
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default FourCircle;
