import React, { useEffect, useState, useContext } from 'react';
import style from './Carousel.module.css';
import { useSwipeable } from 'react-swipeable';
import { default as CarouselImport } from 'react-spring-3d-carousel';
import DoubleSideCard from './DoubleSideCard.jsx';
import LgDoubleSideCard from './LgDoubleSideCard.jsx';
import { getRecommendEvents } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../../useBreakPoint';
//info for sample data
const defaultContent = {
	imageUrl: '',
	header: 'to be continue...',
	date: 'date',
	content: 'to be continue...',
};

const Carousel = () => {
	const [activateImg, setActivateImg] = useState(1);
	const [flip, setFlip] = useState(false);
	const [recentContent, setRecentContent] = useState([]);
	const [alwaysContent, setAlwaysContent] = useState([]);
	const { inBreakPoint } = useContext(BreakPointContext);

	const moveLeft = () => {
		setActivateImg(activateImg - 1);
	};

	const moveRight = () => {
		setActivateImg(activateImg + 1);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		(async function (food) {
			const recentList = (await getRecommendEvents('recent')).map((v, i) => {
				return {
					imageUrl: v.image.card,
					header: v.text,
					date: v.date,
					id: v.id,
					content: v.info,
					index: i,
				};
			});
			const alwaysList = (await getRecommendEvents('always')).map((v, i) => {
				return {
					imageUrl: v.image.card,
					header: v.text,
					date: v.date,
					id: v.id,
					content: v.info,
					index: i,
				};
			});
			//info make two content lists to the same length
			const maxContentLength = Math.max(recentList.length, alwaysList.length);
			const fillList = (list) =>
				list.concat(
					[...new Array(maxContentLength - list.length)].map((_, i) => {
						return { ...defaultContent, index: i + list.length };
					})
				);
			setRecentContent(fillList(recentList));
			setAlwaysContent(fillList(alwaysList));
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let slides = recentContent.map((content, i) => {
		return {
			key: i,
			content: (
				<>
					{inBreakPoint ? (
						<div className={style.cardWrapper}>
							<DoubleSideCard
								FrontCardContent={recentContent[i]}
								BackCardContent={alwaysContent[i]}
								flip={flip}
							></DoubleSideCard>
						</div>
					) : (
						<div className={style.LgCardWrapper}>
							<LgDoubleSideCard
								FrontCardContent={recentContent[i]}
								BackCardContent={alwaysContent[i]}
								flip={flip}
							></LgDoubleSideCard>
						</div>
					)}
				</>
			),
		};
	});

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			setActivateImg(activateImg + 1);
		},
		onSwipedRight: () => {
			setActivateImg(activateImg - 1);
		},
	});
	return (
		<div className={style.carouselComponentWrapper}>
			{inBreakPoint ? (
				<div className={style.App}>
					<div className={style.headerWrapper}>
						<div className={flip ? '' : style.headerActive}>
							<h1
								className={style.header}
								onClick={() => {
									setFlip(false);
								}}
								style={
									flip
										? {}
										: {
												textDecorationColor: 'black',
												color: 'black',
										  }
								}
							>
								近期活動
							</h1>
						</div>
						<div className={flip ? style.headerActive : ''}>
							<h1
								className={style.header}
								onClick={() => {
									setFlip(true);
								}}
								style={
									flip
										? {
												textDecorationColor: 'black',
												color: 'black',
										  }
										: {
												color: 'gray',
										  }
								}
							>
								常設展覽
							</h1>
						</div>
					</div>
					<div className={style.prev} onClick={moveLeft}>
						<img
							alt='arrowLeft'
							className={style.imgArrow}
							src='/carousel/carouselPrev.webp'
						></img>
					</div>
					<div className={style.next} onClick={moveRight}>
						<img
							alt='arrowRight'
							className={style.imgArrow}
							src='/carousel/carouselNext.webp'
						></img>
					</div>
					<div className={style.carouselWrapper} {...handlers}>
						{slides.length === 0 ? (
							<></>
						) : (
							<CarouselImport
								slides={slides}
								goToSlide={activateImg}
								offsetRadius={2}
								animationConfig={{ tension: 120, friction: 14 }}
							></CarouselImport>
						)}
					</div>
				</div>
			) : (
				<div className={style.lgApp}>
					<div className={style.lgHeaderWrapper}>
						<div className={flip ? '' : style.headerActive}>
							<h1
								className={style.lgHeader}
								onClick={() => {
									setFlip(false);
								}}
								style={
									flip
										? {
												color: 'gray',
										  }
										: {
												// textDecoration: 'underline',
												textDecorationColor: 'black',
												color: 'black',
										  }
								}
							>
								近 期 活 動
							</h1>
						</div>
						<div className={flip ? style.headerActive : ''}>
							<h1
								className={style.lgHeader}
								onClick={() => {
									setFlip(true);
								}}
								style={
									flip
										? {
												textDecorationColor: 'black',
												color: 'black',
										  }
										: {
												color: 'gray',
										  }
								}
							>
								常 設 展 覽
							</h1>
						</div>
					</div>
					<div className={style.lgPrev} onClick={moveLeft}>
						<img
							alt='arrowLeft'
							className={style.imgArrow}
							src='/carousel/carouselPrev.webp'
						></img>
					</div>
					<div className={style.lgNext} onClick={moveRight}>
						<img
							alt='arrowRight'
							className={style.imgArrow}
							src='/carousel/carouselNext.webp'
						></img>
					</div>
					<div className={style.lgCarouselWrapper} {...handlers}>
						{slides.length === 0 ? (
							<></>
						) : (
							<CarouselImport
								slides={slides}
								goToSlide={activateImg}
								offsetRadius={3}
								animationConfig={{ tension: 120, friction: 14 }}
							></CarouselImport>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Carousel;
