import React, { useEffect, useState } from 'react';
import style from './Carousel.module.css';
import { useSwipeable } from 'react-swipeable';
import { default as CarouselImport } from 'react-spring-3d-carousel';
import DoubleSideCard from './DoubleSideCard.jsx';
import { getRecommendEvents } from '@leon123858/ntuaf-sdk';

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
		console.log('render');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//info create carousel cards for carousel
	let slides = recentContent.map((content, i) => {
		return {
			key: i,
			content: (
				<div className={style.cardWrapper}>
					<DoubleSideCard
						FrontCardContent={recentContent[i]}
						BackCardContent={alwaysContent[i]}
						flip={flip}
					></DoubleSideCard>
				</div>
			),
		};
	});
	//info swipe effect
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			setActivateImg(activateImg + 1);
		},
		onSwipedRight: () => {
			setActivateImg(activateImg - 1);
		},
	});

	return (
		<div className={style.App}>
			<div className={style.headerWrapper}>
				<h1
					className={style.header}
					onClick={() => {
						setFlip(false);
					}}
				>
					近期活動
				</h1>
				<h1
					className={style.header}
					onClick={() => {
						setFlip(true);
					}}
				>
					常設展覽
				</h1>
				<div className={style.prev} onClick={moveLeft}>
					❮
				</div>
				<div className={style.next} onClick={moveRight}>
					❯
				</div>
			</div>

			<div className={style.carouselWrapper} {...handlers}>
				<CarouselImport
					slides={slides}
					goToSlide={activateImg}
					offsetRadius={2}
					animationConfig={{ tension: 120, friction: 14 }}
				></CarouselImport>
			</div>
		</div>
	);
};

export default Carousel;
