import { React, useState, useEffect, useContext } from 'react';
import { List, Skeleton, Divider, Tabs, message, Select } from 'antd';
import { ArtworkText, ArtworkImg } from './Artwork';
import {
	getArtworkList,
	getLikeArtworkToday,
	triggerLikeArtwork,
} from '@leon123858/ntuaf-sdk';
import { ARTWORK_TYPE } from '@leon123858/ntuaf-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BreakPointContext } from '../../useBreakPoint';

export const ArtworkList = () => {
	const { isLogin } = useContext(BreakPointContext);
	const [loading, setLoading] = useState(false);
	const [typeText, setTypeText] = useState({
		type: ARTWORK_TYPE.PURE_TEXT,
		sortBy: '',
		dataList: [],
		cursor: 0,
	});
	const [typePhoto, setTypePhoto] = useState({
		type: ARTWORK_TYPE.PHOTO,
		sortBy: '',
		dataList: [],
		cursor: 0,
	});
	const [typePainting, setTypePainting] = useState({
		type: ARTWORK_TYPE.PAINTING,
		sortBy: '',
		dataList: [],
		cursor: 0,
	});
	const [activeKey, setActiveKey] = useState('1');
	const [likeArtworkToday, setLikeArtworkToday] = useState([]);
	useEffect(() => {
		const getLikeList = async () => {
			try {
				let like = await getLikeArtworkToday();
				setLikeArtworkToday(like);
			} catch (e) {
				console.log(e);
			}
		};
		if (isLogin) {
			getLikeList();
		} else {
			setLikeArtworkToday([]);
		}
	}, [isLogin]);

	useEffect(() => {
		let datas =
			activeKey === '1'
				? typeText
				: activeKey === '2'
				? typePhoto
				: typePainting;
		initData(datas.sortBy)
			.then(setLoading(false))
			.then(() => {
				const top = document.querySelectorAll('.scrollToTop');
				top.forEach((item) => {
					item.scrollIntoView({ behavior: 'smooth', block: 'start' });
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKey]);

	const handleLike = (dataList, likeList) => {
		const dataListWithLike = dataList.map((data) => {
			if (likeList.includes(data.id)) {
				return { ...data, likeToday: true };
			} else {
				return { ...data, likeToday: false };
			}
		});
		return dataListWithLike;
	};

	const initData = async (sortBy) => {
		// console.log('initial called');
		let datas =
			activeKey === '1'
				? typeText
				: activeKey === '2'
				? typePhoto
				: typePainting;
		if (datas.sortBy !== sortBy) {
			// console.log('change sortBy');
			datas = {
				...datas,
				sortBy: sortBy,
				dataList: [],
				cursor: 0,
			};
		}
		if (sortBy === '') sortBy = 'like';
		if (datas.dataList.length > 0) {
			//handle cache
			return;
		}
		const { data: partialData, cursor: tempCursor } = await getArtworkList(
			datas.type,
			sortBy
		);
		// const likeList = await getLikeArtworkToday();
		await delay(100);
		switch (activeKey) {
			case '1':
				setTypeText({
					...typeText,
					dataList: partialData,
					cursor: tempCursor,
					sortBy: datas.sortBy,
				});
				break;
			case '2':
				setTypePhoto({
					...typePhoto,
					dataList: partialData,
					cursor: tempCursor,
					sortBy: datas.sortBy,
				});
				break;
			case '3':
				setTypePainting({
					...typePainting,
					dataList: partialData,
					cursor: tempCursor,
					sortBy: datas.sortBy,
				});
				break;
			default:
				break;
		}
		// console.log('data initialed');
	};

	const updateData = async () => {
		const datas =
			activeKey === '1'
				? typeText
				: activeKey === '2'
				? typePhoto
				: typePainting;
		const { data: partialData, cursor: tempCursor } = await getArtworkList(
			datas.type,
			datas.sortBy,
			datas.cursor
		);
		switch (activeKey) {
			case '1':
				setTypeText({
					...typeText,
					dataList: [...typeText.dataList, ...partialData],
					cursor: tempCursor,
				});
				break;
			case '2':
				setTypePhoto({
					...typePhoto,
					dataList: [...typePhoto.dataList, ...partialData],
					cursor: tempCursor,
				});
				break;
			case '3':
				setTypePainting({
					...typePainting,
					dataList: [...typePainting.dataList, ...partialData],
					cursor: tempCursor,
				});
				break;
			default:
				break;
		}
		// console.log('data updated');
	};

	const loadMoreData = () => {
		if (loading) {
			return;
		}
		setLoading(true);
		// console.log('loading more');
		updateData().then(setLoading(false));
	};

	const heartOnClick = async (artworkId) => {
		if (!isLogin) {
			message.warning('Should login first!');
			return 0;
		}
		try {
			const originHave = likeArtworkToday.includes(artworkId);
			const newLikeList = await triggerLikeArtwork(artworkId);
			const newHave = newLikeList.includes(artworkId);
			setLikeArtworkToday(newLikeList);
			// console.log(newLikeList);
			// console.log(`Heart ${artworkId} triggered`);
			if (originHave === newHave) return 0;
			if (originHave) return -1;
			return 1;
		} catch (err) {
			console.log(err);
			message.error(err);
			return 0;
		}
	};

	const getChild = () => {
		const datas =
			activeKey === '1'
				? typeText
				: activeKey === '2'
				? typePhoto
				: typePainting;
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
					dataLength={datas.dataList.length}
					next={loadMoreData}
					hasMore={datas.cursor === null ? false : true}
					loader={
						<Skeleton
							avatar
							paragraph={{
								rows: 1,
							}}
							active
						/>
					}
					height={450} //這裡的height 要比上面的"scrollableDiv"的height 小一點，不然其他tab不會loadmore
					endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
					scrollableTarget='scrollableDiv'
				>
					<List
						grid={{ gutter: 8, column: 2 }}
						dataSource={handleLike(datas.dataList, likeArtworkToday)}
						renderItem={(item, i) => (
							<>
								{i === 0 ? <div className='scrollToTop'></div> : ''}
								<List.Item key={item.id}>
									{activeKey === '1' ? (
										<ArtworkText data={item} heartOnClick={heartOnClick} />
									) : (
										<ArtworkImg data={item} heartOnClick={heartOnClick} />
									)}
								</List.Item>
							</>
						)}
					/>
				</InfiniteScroll>
			</div>
		);
	};

	const onChange = (key) => {
		setActiveKey(key);
		setLoading(true);
	};

	const delay = (delayInms) => {
		return new Promise((resolve) => setTimeout(resolve, delayInms));
	};

	const handleChange = (value) => {
		initData(value.value);
	};
	const Selecter = () => {
		let datas =
			activeKey === '1'
				? typeText
				: activeKey === '2'
				? typePhoto
				: typePainting;
		return (
			<Select
				labelInValue
				defaultValue={{
					value: 'default',
					label:
						datas.sortBy === 'like'
							? '愛心排行'
							: datas.sortBy === 'createTime'
							? '最近上傳'
							: '排序',
				}}
				style={{
					width: 120,
				}}
				onChange={handleChange}
				options={[
					{
						value: 'createTime',
						label: '最近上傳',
					},
					{
						value: 'like',
						label: '愛心排行',
					},
				]}
			/>
		);
	};

	const items = ['純文字組', '照片組', '繪畫組'];
	return (
		<>
			<Selecter />
			<Tabs
				activeKey={activeKey}
				centered
				items={items.map((item, i) => {
					const id = String(i + 1);
					return {
						label: item,
						key: id,
						children: getChild(),
					};
				})}
				onChange={onChange}
			/>
		</>
	);
};
