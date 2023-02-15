import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Card, Tabs } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getArtworkList, getMembersByDepartment } from '@leon123858/ntuaf-sdk'
import { ARTWORK_TYPE, Artwork } from '@leon123858/ntuaf-sdk';

function Post() {
	const [dataList, setDataList] = useState<Artwork[]>([])
	const [loading, setLoading] = useState(false);
	const [cursor, setCursor] = useState<any>();
	const [activeKey, setActiveKey] = useState("1")

	useEffect(() => {

		(async () => {
			initData()
			// let { cursor: tempCursor, data } = await getArtworkList(ARTWORK_TYPE.PAINTING, "createTime");
			// console.log(data)
			// setDataList(data)
			// setCursor(tempCursor)
		})()
	}, []);
	useEffect(() => {
		console.log("cursor:", cursor);
		console.log("data:", dataList);
		(async () => {
			initData()
			// let { cursor: tempCursor, data } = await getArtworkList(ARTWORK_TYPE.PAINTING, "createTime");
			// console.log(data)
			// setDataList(data)
			// setCursor(tempCursor)
		})()
	}, [activeKey]);
	const loadMoreData = () => {
		alert("update");
		if (loading) {
			console.log("return")
			return;
		}
		setLoading(true);
		
		(async () => {
			updateData();
			setLoading(false);
		})()
	};
	const updateData = async () => {
		const type = activeKey==="1"?ARTWORK_TYPE.PURE_TEXT:activeKey==="2"?ARTWORK_TYPE.PHOTO:ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(type, 'like', cursor);
		setDataList([...dataList, ...data])
		setCursor(tempCursor)
		console.log("dataUpdated",type)
	}
	const initData = async () => {
		const type = activeKey==="1"?ARTWORK_TYPE.PURE_TEXT:activeKey==="2"?ARTWORK_TYPE.PHOTO:ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(type, 'like');
		setDataList(data)
		setCursor(tempCursor)
		console.log("datainited",type)
	}
	const getChildren = () => (
		<div
			id="scrollableDiv"
			style={{
				height: 400,
				overflow: 'auto',
				padding: '0 16px',
				border: '1px solid rgba(140, 140, 140, 0.35)',
			}}
		>

			<InfiniteScroll
				dataLength={dataList.length}
				next={loadMoreData}
				hasMore={cursor}
				loader={
					<Skeleton
						avatar
						paragraph={{
							rows: 1,
						}}
						active
					/>
				}
				endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
				scrollableTarget="scrollableDiv"
			>
				<List
					dataSource={dataList}
					renderItem={(item) => (
						<List.Item key={item.email}>
							<Card title={item.name} bordered={true} style={{ width: "100%" }}>
								<p>text: {item.text}</p>
								<p>type: {item.type}</p>
							</Card>
						</List.Item>

					)}
				/>
			</InfiniteScroll>

		</div>
	)
	const items = [
		{
			label: "純文字組",
			key: "1",
			children: getChildren()
		},
		{
			label: "照片組",
			key: "2",
			children: getChildren()
		},
		{
			label: "繪畫組",
			key: "3",
			children: getChildren()
		},
	];
	const onChange = (key:string) => {
		setActiveKey(key)
	}
	return (
		<>
			<Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
			{cursor ? "還有" : "沒了"}
			{/* <div
				id="scrollableDiv"
				style={{
					height: 400,
					overflow: 'auto',
					padding: '0 16px',
					border: '1px solid rgba(140, 140, 140, 0.35)',
				}}
			>

				<InfiniteScroll
					dataLength={dataList.length}
					next={loadMoreData}
					hasMore={cursor}
					loader={
						<Skeleton
							avatar
							paragraph={{
								rows: 1,
							}}
							active
						/>
					}
					endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
					scrollableTarget="scrollableDiv"
				>
					<List
						dataSource={dataList}
						renderItem={(item) => (
							<List.Item key={item.email}>
								<Card title={item.name} bordered={true} style={{ width: "100%" }}>
									<p>text: {item.text}</p>
								</Card>
							</List.Item>

						)}
					/>
				</InfiniteScroll>

			</div> */}

		</>
	);
}

export default Post;
