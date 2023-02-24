import { React, useState, useEffect, useRef } from 'react';
import { List, Skeleton, Divider, Tabs } from 'antd';
import { ArtworkText, ArtworkImg } from './Artwork';
import { getArtworkList, getLikeArtworkToday,triggerLikeArtwork, userId} from '@leon123858/ntuaf-sdk';
import { ARTWORK_TYPE } from '@leon123858/ntuaf-sdk';
import InfiniteScroll from 'react-infinite-scroll-component';


export const ArtworkList = () => {
    const [loading, setLoading] = useState(false);
    const [typeText, setTypeText] = useState({
        type: ARTWORK_TYPE.PURE_TEXT,
        dataList: [],
        cursor: 0,
    })
    const [typePhoto, setTypePhoto] = useState({
        type: ARTWORK_TYPE.PHOTO,
        dataList: [],
        cursor: 0,
    })
    const [typePainting, setTypePainting] = useState({
        type: ARTWORK_TYPE.PAINTING,
        dataList: [],
        cursor: 0,
    })
    const [activeKey, setActiveKey] = useState("1")
    const [likeArtworkToday, setLikeArtworkToday] = useState([])
    useEffect(
        () => {
            const getLikeList = async () => {
                try {

                    let like = await getLikeArtworkToday()
                    setLikeArtworkToday(like)
                }catch(e){
                    console.log(e)
                }
            }
            getLikeList()
        }, []
    )

    useEffect(
        () => {
            initData().then((setLoading(false))).then(() => {
                const top = document.querySelectorAll('.scrollToTop')
                top.forEach((item) => { item.scrollIntoView({ behavior: 'smooth', block: "start" }) })
            }
            )
        }, [activeKey]
    )

    const handleLike = (dataList, likeList) => {

        const dataListWithLike = dataList.map((data) => {
            if (likeList.includes(data.id)) {
                return { ...data, likeToday: true }
            }
            else {
                return { ...data, likeToday: false }
            }
        })
        return dataListWithLike
    }

    const initData = async () => {
        const datas = activeKey === "1" ? typeText : activeKey === "2" ? typePhoto : typePainting;
        if (datas.dataList.length > 0) { //handle cache
            return
        }
        const { data: partialData, cursor: tempCursor } = await getArtworkList(datas.type, 'like');
        const likeList = await getLikeArtworkToday();
        console.log(likeList)
        await delay(100);
        switch (activeKey) {
            case "1":
                setTypeText({ ...typeText, dataList: partialData, cursor: tempCursor })
                break
            case "2":
                setTypePhoto({ ...typePhoto, dataList: partialData, cursor: tempCursor })
                break
            case "3":
                setTypePainting({ ...typePainting, dataList: partialData, cursor: tempCursor })
                break
        }
        console.log("data initialed")
    }

    const updateData = async () => {
        const datas = activeKey === "1" ? typeText : activeKey === "2" ? typePhoto : typePainting;
        const { data: partialData, cursor: tempCursor } = await getArtworkList(datas.type, 'like', datas.cursor);
        switch (activeKey) {
            case "1":
                setTypeText({ ...typeText, dataList: [...typeText.dataList, ...partialData], cursor: tempCursor })
                break
            case "2":
                setTypePhoto({ ...typePhoto, dataList: [...typePhoto.dataList, ...partialData], cursor: tempCursor })
                break
            case "3":
                setTypePainting({ ...typePainting, dataList: [...typePainting.dataList, ...partialData], cursor: tempCursor })
                break
        }
        console.log("data updated")
    }

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        console.log("loading more")
        updateData().then((setLoading(false)))
    };

    const heartOnClick = async(artworkId) => {
        const newLikeList = await triggerLikeArtwork(artworkId)
        setLikeArtworkToday(newLikeList)
        console.log(newLikeList)
        console.log(`Heart ${artworkId} triggered`)
    }

    const getChild = () => {
        const datas = activeKey === "1" ? typeText : activeKey === "2" ? typePhoto : typePainting
        return (
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
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        grid={{ gutter: 8, column: 2 }}
                        dataSource={handleLike(datas.dataList,likeArtworkToday)}
                        renderItem={(item, i) => (
                            <>
                                {i === 0 ? <div className='scrollToTop'></div> : ""}
                                <List.Item key={item.id}>
                                    {activeKey === "1" ? <ArtworkText data={item} heartOnClick={heartOnClick}/> : <ArtworkImg data={item} heartOnClick={heartOnClick} />}
                                </List.Item>
                            </>
                        )}
                    />
                </InfiniteScroll>
            </div>
        )
    }

    const onChange = (key) => {
        setActiveKey(key)
        setLoading(true)
    }

    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }

    const items = [
        "純文字組", "照片組", "繪畫組"
    ]
    return (
        <>
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
    )
}