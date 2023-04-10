import styles from './LgOneSideCard.module.css';
import { Link } from 'react-router-dom';
import { Image, Col, Row } from 'antd';

const LgOneSideCard = ({ cardContent }) => {
	return (
		<Link to={`/display/${cardContent.id}`}>
			<div className={styles.oneSideCard}>

				<Row>
					<Col span={14}>
						<div className={styles.imageWrapper}>
							<Image
								src={cardContent.imageUrl}
								preview={false}
								fallback='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=600w'
							/>
						</div></Col>
					<Col span={10}>
						<div className={styles.contentWrapper}>
							<div className={styles.headerWrapper}>
								<h4>{cardContent.header}</h4>
								<h4>{cardContent.date}</h4>
							</div>

							<p className={styles.disc}>
								{cardContent.content} {cardContent.index}
							</p>
							<div>CTA</div>
						</div>
					</Col>
				</Row>

			</div>
		</Link>
	);
};
export default LgOneSideCard;