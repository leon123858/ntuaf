import LgOneSideCard from './LgOneSideCard.jsx';
import style from './LgDoubleSideCard.module.css';

const LgDoubleSideCard = ({ FrontCardContent, BackCardContent, flip }) => {
	// console.log("render double side card")
	return (
		<div className={style.dCardWrapper}>
			{/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
			<div
				className={
					flip === true
						? [style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' ')
						: style.dCardInnerWrapper
				}
			>
				<div className={style.flipFrontCard}>
					<LgOneSideCard cardContent={FrontCardContent} />
				</div>
				{/* <div className={style.flipFrontCard}>hello</div> */}
				{/* {FrontCard?<FrontCard/>:<></>} */}
				{/* {BackCard?<BackCard/>:<></>} */}
				<div className={style.flipBackCard}>
					<LgOneSideCard cardContent={BackCardContent} />
				</div>
			</div>
			{/* </a> */}
		</div>
	);
};

export default LgDoubleSideCard;
