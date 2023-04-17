import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { BreakPointContext } from '../useBreakPoint';
import style from './Map.module.css';

function Map() {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<>
			<br />
			<br />
			<br />
			<div className={style.container}>
				<div style={{ marginBottom: '2rem' }}>
					<div>
						<div className={inBreakPoint ? style.title : style.lgTitle}>
							尋洄地圖
							<div>Map of ArtFest</div>
						</div>
						<div className={inBreakPoint ? style.subtitle : style.lgSubtitle}>
							尋個連結點，洄到藝術季。 <br />
							參與尋洄地圖活動，抽 AirTag！
						</div>
					</div>
					<div className={inBreakPoint ? style.event : style.lgEvent}>
						<div>集點辦法</div>
						於藝術季合作店家消費後，掃描尋洄地圖中 LINE@ 集點卡集點，每集到 7 點便可於<br />
						👉🏻05/13（六）、05/14（日）至藝術季市集服務台扭蛋得寶藏 <br />
						👉🏻05/15（一）後才集滿 7 點，可得小禮一份！<br />
						除了尋洄地圖，市集〈再・旅程〉中有更多集點機會呦！
					</div>
					<div className={inBreakPoint ? style.event : style.lgEvent}>
						<div>活動辦法</div>
						{/* <p>於藝術季合作店家消費後</p> */}
						<ol>
							<li>
								追蹤臺大藝術季 Facebook 與 Instagram 粉絲專頁 @ntuartfest
							</li>
							<li>
								按讚此篇貼文，並tag 兩位朋友留言「＠小尋 @小洄 一起去藝術季店家！」可以重複留言，但不可重複標註（<a className={style.igpost} href='https://reurl.cc/Gev5md' target='_blank' rel='noreferrer'>https://reurl.cc/Gev5md</a>）
							</li>
							<li>
								至任一藝術季合作店家消費，拍攝店家任何角落或餐點，發佈一則 Instagram 限時動態（需留存24小時），標註 @ntuartfest 、附上文字：「臺大藝術季地圖，抽 AirTag！」
							</li>
							<li>
								抽獎期限將於 05/20（六）23:59 截止，並於 05/23（二）前抽出兩位得獎者，分別獲得一個 Air Tag
							</li>
						</ol>
					</div>
					<div className={inBreakPoint ? style.event : style.lgEvent}>
						<div >注意事項</div>
						<ol>
							<li>於不同店家消費，或參與市集多項任務，可以一日集多點。</li>
							<li>
								同個店家每天至多集一點，但不同天於同個店家消費可以重複集點。
							</li>
							<li>
							小禮領取時間會擇日公佈於藝術季 Facebook、Instagram 粉絲專頁。
							</li>
							<li>AirTag 抽獎辦法請見（<a className={style.igpost} href='https://reurl.cc/Gev5md' target='_blank' rel='noreferrer'>https://reurl.cc/Gev5md</a>）</li>
						</ol>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '3rem',
					}}
				>
					<a href='https://lin.ee/ymEZTbB' target='_blank' rel='noreferrer'>
						<div
							className={inBreakPoint ? style.linkButton : style.lgLinkButton}
						>
							<p>加入LINE好友開始集點</p>
							<RightOutlined style={{ fontWeight: '300' }} />
						</div>
					</a>
				</div>

				<div
					className={
						inBreakPoint ? style.storeContainer : style.lgStoreContainer
					}
				>
					<img src='../../尋洄地圖.jpeg' alt='巡迴地圖' />
					<div className={style.store}>
						<p>合作店家</p>
						<ul>
							<li>PICNIC CAFE 野餐咖啡</li>
							<li>小蔬杭 絕對蔬食</li>
							<li>古今書廊二手書店</li>
							<li>白鹿洞書坊</li>
							<li>半路咖啡</li>
							<li>直物生活</li>
							<li>索菲烤布蕾</li>
							<li>理想の部屋</li>
							<li>雅博客二手書店</li>
							<li>綠林寮動漫交誼廳</li>
							<li>薄霧書店</li>
						</ul>
						（依店名筆畫排序）
						<a
							href='https://www.google.com/maps/placelists/list/ggfToSlsSK-j6kSVonMD3A'
							target='_blank'
							rel='noreferrer'
						>
							<div className={style.lgBtn}>
								<span className={style.colorful}>合作店家地圖清單</span>
								<RightOutlined
									style={{
										fontSize: '18px',
										fontWeight: '200',
										color: '#25499D',
									}}
								/>
							</div>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default Map;
