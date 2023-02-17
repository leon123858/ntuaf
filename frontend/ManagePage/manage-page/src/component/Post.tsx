import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Card, Tabs, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getArtworkList, getMembersByDepartment } from '@leon123858/ntuaf-sdk'
import { ARTWORK_TYPE, Artwork } from '@leon123858/ntuaf-sdk';

function Post() {
	const [dataList, setDataList] = useState<Artwork[]>([])
	const [loading, setLoading] = useState(false);
	const [cursor, setCursor] = useState<any>();
	const [activeKey, setActiveKey] = useState("3")

	useEffect(() => {
		if (loading) {
			console.log("return")
			return;
		}
		setLoading(true);
		(async () => {
			await initData()
		})().then(()=>{setLoading(false)})
		
	}, []);
	useEffect(() => {
		(async () => {
			await initData()
		})().then(()=>{setLoading(false)})
	}, [activeKey]);
	const loadMoreData = () => {
		console.log("loadMore")
		if (loading) {
			console.log("return")
			return;
		}
		setLoading(true);
		(async () => {
			await updateData()
		})().then(()=>{setLoading(false)})
	};

	const updateData = async () => {
		const type = activeKey === "1" ? ARTWORK_TYPE.PURE_TEXT : activeKey === "2" ? ARTWORK_TYPE.PHOTO : ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(type, 'like', cursor);
		setDataList([...dataList, ...data])
		setCursor(tempCursor)	
	}
	const initData = async () => {
		const type = activeKey === "1" ? ARTWORK_TYPE.PURE_TEXT : activeKey === "2" ? ARTWORK_TYPE.PHOTO : ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(type, 'like');
		await delay(200)
		setDataList(data)
		setCursor(tempCursor)
	}
	const delay = (delayInms:number) => {
		return new Promise(resolve => setTimeout(resolve, delayInms));
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
							<Card title={item.name} bordered={true} style={{ width: "100%" }} extra={<Button type='link' onClick={()=>{export2json(item)}}>Download</Button>}>
								<p>text: {item.text}</p>
								<p>type: {item.type}</p>
								<p>create time: {item.createTime}</p>
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
	const onChange = (key: string) => {
		setActiveKey(key);
		setLoading(true);
		setDataList([]);
		setCursor(1)
	}
	function export2json(data:Artwork) {
		const a = document.createElement("a");
		a.href = URL.createObjectURL(
		  new Blob([JSON.stringify(data, null, 2)], {
		 type: "application/json"
		  })
		);
		a.setAttribute("download", "data.json");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		 }
	return (
		<>
			<Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
		</>
	);
}

export default Post;
