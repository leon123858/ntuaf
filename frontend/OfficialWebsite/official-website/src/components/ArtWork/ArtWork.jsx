import { Collapse, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import style from './ArtWork.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { useContext } from 'react';
const { Panel } = Collapse;

const ArtEvent = () => {
	// const [isOpened,setOpen] = useState(true);
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<>
			<div
				className={`${inBreakPoint ? style.sm : style.lg} ${style.container}`}
			>
				<Typography>
					<div className={style.title}>
						洄溯展覽暨比賽
						<div className={style.subtitle}>Throwback</div>
					</div>
					<div className={style.words}>
						<p>
							在持續追尋的旅程，我們不禁檢視關於過往與現在的種種，體會生命與曾有的經歷、領悟沈澱在內心深處的痕跡。
						</p>
						<p>
							「洄溯」結合藝術季策展理念，邀請大家藉由文字、攝影或畫作，「洄」到過去，以「原點」及「終點」為主題，分享自己的經歷，同時欣賞他人的故事。
						</p>
					</div>
				</Typography>
				<Collapse
					className={style.collapse}
					expandIconPosition='end'
					expandIcon={({ isActive }) => (
						<RightOutlined rotate={isActive ? 90 : 0} />
					)}
					bordered={!inBreakPoint}
					// ghost
				>
					<Panel header={<span className={style.title}>比賽規則</span>} key='1'>
						<div className={style.content}>
							1. 共分為三組：
							<ul>
								<li>純文字組 </li>
								<li>照片組（須附100字內說明文字）</li>
								<li>繪畫組（須附100字內說明文字、可以電繪或手繪）</li>
							</ul>
							<br></br>
							2.
							展期結束後將由3位評審分別依據文字、照片、繪畫進行評選，再綜合作品獲得的愛心數量，最終分別選出三組各2名得獎者，共有6名得獎者。
							<br></br>
							<br></br>
							3. 為鼓勵參與，加開2名人氣獎得獎者及10名抽獎得獎者。
							<br></br>
							<br></br>
							4.主辦單位保有最終修改、變更、活動解釋及取消本活動之權利，若有相關異動將會另行公告於粉專或官網。
						</div>
					</Panel>
				</Collapse>
				<Collapse
					className={style.collapse}
					expandIconPosition='end'
					expandIcon={({ isActive }) => (
						<RightOutlined rotate={isActive ? 90 : 0} />
					)}
					bordered={!inBreakPoint}

					// bordered={false}
					// ghost
					// defaultActiveKey={['2']}
				>
					<Panel header={<span className={style.title}>比賽獎勵</span>}>
						<div className={style.content}>
							人氣獎（不分組取2名）：環保商品組*2
							<br></br>
							<br />
							評審獎（分組，每組取前2名）
							<br></br>
							<div>•純文字組</div>
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							首獎：鋼筆 + 評審簽名書
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							二獎：評審簽名小卡+商品
							<br></br>
							<div>•照片組</div>
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							首獎：底片相機 + 評審簽名書
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							二獎：評審簽名小卡+商品
							<br></br>
							<div>•繪畫組</div>
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							首獎：水彩顏料&畫本 + 評審簽名書
							<br></br>
							<span style={{ width: '16px', display: 'inline-block' }} />
							二獎：評審簽名小卡+商品
							<br></br>
							<br />
							抽獎（不分組取10名）：韓式拍貼兌換券*10
						</div>
					</Panel>
				</Collapse>
				<div className={style.date}>
					<div>比賽時程</div>
					<span>
						<p>開</p>
						<p>放</p>
						<p>投</p>
						<p>稿</p>
					</span>
					｜04/14（五）～ 04/30（日）
					<br />
					<span>
						<p>評</p>
						<p>選</p>
					</span>
					｜05/01（一）～ 05/06（六）
					<br />
					<span>
						<p>公</p>
						<p>布</p>
					</span>
					｜05/07（一）23:59 前
				</div>
				<div className={style.midContainer}>
					<Link to='/Artwork/Upload'>
						<div className={style.btn}>
							<span className={style.colorful}>比賽投稿</span>
							<RightOutlined
								style={{
									fontSize: '18px',
									fontWeight: '200',
									color: inBreakPoint ? '#25499D' : '',
								}}
							/>
						</div>
					</Link>
					<Link to='/ArtworkList'>
						<div className={style.btn}>
							<span className={style.colorful}>展覽專區</span>
							<RightOutlined
								style={{
									fontSize: '18px',
									fontWeight: '200',
									color: inBreakPoint ? '#25499D' : '',
								}}
							/>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default ArtEvent;
