import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
				<div style={{ marginBottom: '3rem' }}>
					<div>
						<div className={inBreakPoint ? style.title : style.lgTitle}>
							尋洄地圖
							<div>Map of ArtFest</div>
						</div>
						<div className={inBreakPoint ? style.subtitle : style.lgSubtitle}>
							在公館探索藝術季合作店家，徜徉於藝術與永續的氛圍；
							向臺大校園內探索，一窺臺大藝術季全貌。
						</div>
					</div>
					<div className={inBreakPoint ? style.event : style.lgEvent}>
						<div>活動辦法</div>
						<p>於藝術季合作店家消費後</p>
						<ol>
							<li>
								掃描尋洄地圖中 LINE@
								集點卡集點，每集到三點便可兌換一組藝術季貼紙。
							</li>
							<li>
								拍攝店家櫃檯上尋洄地圖，並上傳至 Instagram 限時動態，即可獲得
								AirTag 抽獎機會！
							</li>
						</ol>
						<br />
						<p>注意事項：</p>
						<ol>
							<li>於同個店家重複消費可以重複集點</li>
							<li>
								貼紙領取時間將於 5/5 公佈於藝術季臉書及 Instagram 粉絲專頁
							</li>
							<li>AirTag 抽獎辦法請見 （到時放哎居連結）</li>
						</ol>
					</div>
				</div>
				{/* <div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '3rem',
					}}
				>
					<a href="https://lin.ee/ymEZTbB" target="_blank">

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
					<img src='../../尋洄地圖.png' alt='巡迴地圖' />
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
						<a href='https://www.google.com/maps/placelists/list/ggfToSlsSK-j6kSVonMD3A' target="_blank">
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
