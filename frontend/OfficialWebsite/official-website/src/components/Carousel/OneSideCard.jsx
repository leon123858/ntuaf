import styles from './OneSideCard.module.css';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

const OneSideCard = ({ cardContent }) => {
	return (
		<Link to={`/display/${cardContent.id}`}>
			<div className={styles.oneSideCard}>
				{/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}

				<div className={styles.headerWrapper}>
					<h4>{cardContent.header}</h4>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src={cardContent.imageUrl}
						preview={false}
						fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
					/>
				</div>
				<h4>{cardContent.date}</h4>
				<p className={styles.disc}>
					{cardContent.content} {cardContent.index}
				</p>
			</div>
		</Link>
	);
};
export default OneSideCard;
