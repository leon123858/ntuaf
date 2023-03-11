import { React, useState } from 'react';
import { Card, Typography, Modal, Divider, Image } from 'antd';
import Heart from '../ArtBox/heart';
import styles from './ArtworkList.module.css';
import styled from 'styled-components';
const { Paragraph, Text } = Typography;
// const test = {
// 	id: 123,
// 	type: 123,
// 	name: '作者名稱',
// 	artworkName: '作品名稱',
// 	email: 123,
// 	url: 123,
// 	text: '這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，',
// 	createTime: 123,
// 	like: 123,
// 	tmpLike: 123,
// };
const ArtworkName = styled.div`
	font-weight: 600;
	font-size: 24px;
`;
const CreaterName = styled.div`
	font-weight: 600;
	font-size: 16px;
`;
export const ArtworkText = ({ data, heartOnClick }) => {
	const [open, setOpen] = useState(false);
	const [likeShow, setLikeShow] = useState(data.tmpLike + data.like);
	return (
		<>
			<div className={styles.container}>
				<Card
					bordered={false}
					style={{ width: '100%' }}
					hoverable={true}
					onClick={() => {
						setOpen(true);
					}}
				>
					<ArtworkName>{data.artworkName}</ArtworkName>
					<Paragraph
						style={{ width: '100%' }}
						ellipsis={{
							rows: 2,
						}}
					>
						{data.text}
					</Paragraph>
					<CreaterName>{data.name}</CreaterName>
				</Card>
				<div className={styles.heart}>
					<Text strong>{likeShow}</Text>
					<Heart
						style={{
							width: 20,
							marginLeft: 5,
						}}
						isActive={data.likeToday}
						onClick={async () => {
							const newLike = (await heartOnClick(data.id)) + likeShow;
							setLikeShow(newLike);
						}}
					/>
				</div>
			</div>

			<Modal
				open={open}
				onCancel={() => {
					setOpen(false);
				}}
				footer={null}
			>
				<div className={styles.container}>
					<ArtworkName>{data.artworkName}</ArtworkName>
					<CreaterName>撰文者：{data.name}</CreaterName>

					<div className={styles.heart} style={{ bottom: 0, right: 0 }}>
						<Text strong>{likeShow}</Text>
						<Heart
							style={{
								width: 20,
								marginLeft: 5,
							}}
							isActive={data.likeToday}
							onClick={async () => {
								const newLike = (await heartOnClick(data.id)) + likeShow;
								setLikeShow(newLike);
							}}
						/>
					</div>
				</div>
				<Divider />
				<Text>{data.text}</Text>
			</Modal>
		</>
	);
};

export const ArtworkImg = ({ data, heartOnClick }) => {
	const [open, setOpen] = useState(false);
	const [likeShow, setLikeShow] = useState(data.tmpLike + data.like);
	return (
		<>
			<div className={styles.container}>
				<Card
					bordered={false}
					style={{ width: '100%' }}
					hoverable
					onClick={() => {
						setOpen(true);
					}}
					cover={
						<img
							alt='img'
							src='https://imgs.gvm.com.tw/upload/gallery/20221204/125075.jpg'
						/>
					}
				>
					<ArtworkName>{data.artworkName}</ArtworkName>
					<CreaterName>{data.name}</CreaterName>
				</Card>
				<div className={styles.heart}>
					<Text strong>{likeShow}</Text>
					<Heart
						style={{
							width: 20,
							marginLeft: 5,
						}}
						isActive={data.likeToday}
						onClick={async () => {
							const newLike = (await heartOnClick(data.id)) + likeShow;
							setLikeShow(newLike);
						}}
					/>
				</div>
			</div>

			<Modal
				open={open}
				onCancel={() => {
					setOpen(false);
				}}
				footer={null}
			>
				<div className={styles.container}>
					<ArtworkName>{data.artworkName}</ArtworkName>
					<CreaterName>創作者：{data.name}</CreaterName>

					<div className={styles.heart} style={{ bottom: 0, right: 0 }}>
						<Text strong>{likeShow}</Text>
						<Heart
							style={{
								width: 20,
								marginLeft: 5,
							}}
							isActive={data.likeToday}
							onClick={async () => {
								const newLike = (await heartOnClick(data.id)) + likeShow;
								setLikeShow(newLike);
							}}
						/>
					</div>
				</div>
				<br />
				<Image
					witdh={'100%'}
					src='https://imgs.gvm.com.tw/upload/gallery/20221204/125075.jpg'
				></Image>
				<Text>
					<br />
					{data.text}
				</Text>
			</Modal>
		</>
	);
};
