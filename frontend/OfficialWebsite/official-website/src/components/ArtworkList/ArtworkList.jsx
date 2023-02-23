import { React, useState, useEffect } from 'react';
import { List, Skeleton, Divider, Tabs } from 'antd';
import { ArtworkText, ArtworkImg } from './Artwork';
import { getArtworkList } from '@leon123858/ntuaf-sdk';
import { ARTWORK_TYPE } from '@leon123858/ntuaf-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';


export const ArtworkList = () => {
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [cursor, setCursor] = useState("1");
    const [activeKey, setActiveKey] = useState("1")

    useEffect(
        () => {
            initData().then((setLoading(false)))
        }, [activeKey]
    )

    const initData = async () => {
        const type = activeKey === "1" ? ARTWORK_TYPE.PURE_TEXT : activeKey === "2" ? ARTWORK_TYPE.PHOTO : ARTWORK_TYPE.PAINTING;
        const { data: partialData, cursor: tempCursor } = await getArtworkList(type, 'like');
        await delay(100);
        setDataList(partialData);
        setCursor(tempCursor);
        console.log("data initialed", { dataList, cursor })
    }

    const updateData = async () => {
        const type = activeKey === "1" ? ARTWORK_TYPE.PURE_TEXT : activeKey === "2" ? ARTWORK_TYPE.PHOTO : ARTWORK_TYPE.PAINTING;
        const { data: partialData, cursor: tempCursor } = await getArtworkList(type, 'like', cursor);
        setDataList([...dataList, ...partialData]);
        setCursor(tempCursor);
        console.log("data updated")
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        updateData().then((setLoading(false)))
    };
    
    const getChild = () => (
        <div
            id="scrollableDiv"
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
                hasMore={cursor == undefined ? false : true}
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
                scrollableTarget="scrollableDiv"
            >
                <List
                    grid={{ gutter: 8, column: 2 }}
                    dataSource={dataList}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            {activeKey === "1" ? <ArtworkText data={item} /> : <ArtworkImg data={item} />}
                        </List.Item>
                    )}
                    style={{}}
                />
            </InfiniteScroll>
        </div>
    )

    const onChange = (key) => {
        setActiveKey(key)
        setLoading(true)
        setDataList([])
        setCursor("1")
    }

    const delay = (delayInms) => {
		return new Promise(resolve => setTimeout(resolve, delayInms));
	}

    const items = [
        "純文字組", "照片組", "繪畫組"
    ]
    return (
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
    )
}