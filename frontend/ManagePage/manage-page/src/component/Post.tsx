import React, { useEffect, useRef, useState } from 'react';
import { Divider, List, Skeleton, Card, Tabs, Button, Image } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getArtworkList } from '@leon123858/ntuaf-sdk';
import { ARTWORK_TYPE, Artwork } from '@leon123858/ntuaf-sdk';

function Post() {
	const [dataList, setDataList] = useState<Artwork[]>([]);
	const [loading, setLoading] = useState(false);
	const cursor = useRef<any>();
	const [activeKey, setActiveKey] = useState('1');

	useEffect(() => {
		console.log('rerander');
		(async () => {
			await initData();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			await initData();
		})();
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKey]);

	const loadMoreData = () => {
		console.log('loadMore');
		if (loading) {
			console.log('return');
			return;
		}
		setLoading(true);
		(async () => {
			await updateData();
		})();
		setLoading(false);
	};

	const updateData = async () => {
		const type =
			activeKey === '1'
				? ARTWORK_TYPE.PURE_TEXT
				: activeKey === '2'
				? ARTWORK_TYPE.PHOTO
				: ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(
			type,
			'createTime',
			cursor.current
		);
		setDataList([...dataList, ...data]);
		cursor.current = tempCursor;
	};
	const initData = async () => {
		console.log('init');
		const type =
			activeKey === '1'
				? ARTWORK_TYPE.PURE_TEXT
				: activeKey === '2'
				? ARTWORK_TYPE.PHOTO
				: ARTWORK_TYPE.PAINTING;
		let { cursor: tempCursor, data } = await getArtworkList(type, 'createTime');
		await delay(200);
		setDataList(data);
		cursor.current = tempCursor;
	};
	const delay = (delayInms: number) => {
		return new Promise((resolve) => setTimeout(resolve, delayInms));
	};
	const getChildren = () => {
		return (
			<div
				id='scrollableDiv'
				style={{
					height: 500,
					overflow: 'auto',
					padding: '0 16px',
					border: '1px solid rgba(140, 140, 140, 0.35)',
				}}
			>
				<InfiniteScroll
					dataLength={dataList.length}
					next={loadMoreData}
					hasMore={cursor.current == null ? false : true}
					loader={
						<Skeleton
							avatar
							paragraph={{
								rows: 1,
							}}
							active
						/>
					}
					height={450}
					endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
					scrollableTarget='scrollableDiv'
				>
					<List
						dataSource={dataList}
						renderItem={(item, i) => (
							<List.Item key={item.email}>
								<Card
									title={item.name}
									bordered={true}
									style={{ width: '100%' }}
									extra={
										<Button
											type='link'
											onClick={() => {
												export2json(item);
											}}
										>
											Download
										</Button>
									}
								>
									<p>id: {item.id}</p>
									<p>text: {item.text}</p>
									<p>type: {item.type}</p>
									<p>create time: {item.createTime}</p>
									<Image height={50} src={item.url} />
								</Card>
							</List.Item>
						)}
					/>
				</InfiniteScroll>
			</div>
		);
	};
	const onChange = (key: string) => {
		setLoading(true);
		setDataList([]);
		cursor.current = 1;
		setActiveKey(key);
	};
	function export2json(data: Artwork) {
		let a = document.createElement('a');
		a.href = URL.createObjectURL(
			new Blob([JSON.stringify(data, null, 2)], {
				type: 'application/json',
			})
		);
		a.setAttribute('download', 'data.json');
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		let b = document.createElement('a');
		b.href = data.url;
		b.download = `image_${data.name}`;
		document.body.appendChild(b);
		b.click();
		document.body.removeChild(b);
	}
	return (
		<>
			<Tabs
				activeKey={activeKey}
				items={['純文字組', '照片組', '繪畫組'].map((label, i) => {
					const id = String(i + 1);
					return {
						label,
						key: id,
						children: getChildren(),
					};
				})}
				onChange={onChange}
			/>
		</>
	);
}

export default Post;
