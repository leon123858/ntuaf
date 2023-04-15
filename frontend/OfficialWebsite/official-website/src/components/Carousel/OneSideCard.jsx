import styles from './OneSideCard.module.css';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

const OneSideCard = ({ cardContent }) => {
	const numOfContentString = 40
	const content = cardContent.content.length>numOfContentString?cardContent.content.substring(0, numOfContentString)+"...":cardContent.content;
	return (
		<Link to={`/display/${cardContent.id}`}>
			<div className={styles.oneSideCard}>
				{/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}

				<div className={styles.headerWrapper}>
					<h4 className={styles.header}>{cardContent.header}</h4>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src={cardContent.imageUrl}
						preview={false}
						fallback='/loading.jpg'
					/>
				</div>
				<h4 className={styles.date}>{cardContent.date}</h4>
				<div className={styles.disc}>
					{content}
				</div>
			</div>
		</Link>
	);
};
export default OneSideCard;
