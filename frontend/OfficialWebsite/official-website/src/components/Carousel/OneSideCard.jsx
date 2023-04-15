import styles from './OneSideCard.module.css';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

const OneSideCard = ({ cardContent }) => {
	return (
		<Link to={`/display/${cardContent.id}`}>
			<div className={styles.oneSideCard}>
				{/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
				<div className={styles.imageWrapper}>
					<Image
						src={cardContent.imageUrl}
						preview={false}
						fallback='/loading.jpg'
					/>
				</div>
				<div className={styles.headerWrapper}>
					<h4>{cardContent.header}</h4>
					<h4>{cardContent.date}</h4>
				</div>

				<p className={styles.disc}>
					{cardContent.content} {cardContent.index}
				</p>
			</div>
		</Link>
	);
};
export default OneSideCard;
