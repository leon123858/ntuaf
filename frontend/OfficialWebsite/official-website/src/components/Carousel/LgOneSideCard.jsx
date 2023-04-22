import styles from './LgOneSideCard.module.css';
import { Link } from 'react-router-dom';
import { Image, Col, Row } from 'antd';

// const DemoBox = (props) => <p style={{height:`${props.value}px`, backgroundColor:"red"}}>{props.value}</p>;
const LgOneSideCard = ({ cardContent }) => {
	const numOfContentString = 85;
	const content =
		cardContent.content.length > numOfContentString
			? cardContent.content.substring(0, numOfContentString) + '...'
			: cardContent.content;
	return (
		<Link to={`/display/${cardContent.id}`}>
			<div className={styles.oneSideCard}>
				<div className={styles.headerWrapper}>
					<h4 className={styles.header}>{cardContent.header}</h4>
				</div>
				<h4 className={styles.date}>{cardContent.date}</h4>
				<div className={styles.imageWrapper}>
					<Image
						src={cardContent.imageUrl}
						preview={false}
						// height={'270px'}
						fallback='/loadingStatic.webp'
					/>
				</div>
				<div className={styles.contentWrapper}>
					{content.includes('continue...') ? (
						<Row justify='space-between' align='bottom'>
							<Col span={24}>
								<p className={styles.disc}>
									{content}
									{/* <DemoBox value={100}>{content}</DemoBox> */}
								</p>
							</Col>
						</Row>
					) : (
						<Row justify='space-between' align='bottom'>
							<Col span={18}>
								<p className={styles.disc}>
									{content}
									{/* <DemoBox value={100}>{content}</DemoBox> */}
								</p>
							</Col>
							<Col span={6}>
								{/* <div style={{backgroundImage: 'url(../cardNext.png)'}} ></div> */}
								<div className={styles.nextImgWrapper}>
									<img
										alt='nextCard'
										src='../cardNext.png'
										className={styles.nextImg}
									></img>
								</div>
								{/* <DemoBox value={50}><img src="../cardNext.png" className={styles.nextImg}></img></DemoBox> */}

								{/* <div>CTA</div> */}
							</Col>
						</Row>
					)}
				</div>
			</div>
		</Link>
	);
};
export default LgOneSideCard;
