import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import Mapo from '../components/Map/Map';

const { Title, Text } = Typography;

function Map() {
	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 30,
				}}
			>
				<div style={{ width: '70%' }}>
					<div style={{ marginBottom: '3rem' }}>
						<Typography>
							<Title
								style={{
									textAlign: 'center',
									borderStyle: 'solid',
									padding: 15,
								}}
							>
								尋洄地圖 <br></br>
								ArtFest Map
							</Title>
							<Title
								style={{
									textAlign: 'center',
									borderStyle: 'solid',
									padding: 20,
								}}
							>
								副標題副標題副標題副標題副標題副標題副標題
							</Title>
						</Typography>
						<div style={{ borderStyle: 'solid', padding: 30 }}>
							<Text style={{ fontSize: 20 }}>
								於藝術季店家消費後，可掃描櫃檯藝術季地圖中「集點換獎品」的QRcode，進入line@集點卡集點，每集到三點，便可於藝術季期間（5/5-5/20）向工作人員領取一組藝術季貼紙。
								<br></br>
								<br></br>
								注意事項：
								<br></br>
								1.於同個店家重複消費可重複集點。
								<br></br>
								2.貼紙領取時間將於5/5公佈於藝術季FB、IG粉絲專頁。
							</Text>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'right',
							marginBottom: '3rem',
						}}
					>
						<Link to='/Artwork/Upload'>
							<div
								style={{
									backgroundColor: 'lightgrey',
									textAlign: 'center',
									padding: 6,
								}}
							>
								<Text style={{ fontSize: 30, margin: '40px' }}>我要集點</Text>
								<RightOutlined style={{ fontSize: 30 }} />
							</div>
						</Link>
					</div>
					<div>
						<Text style={{ fontSize: 30 }}>合作商家名單</Text>
					</div>
					<div>
						<Text style={{ fontSize: 30 }}>
							藝術家地圖
							<Mapo></Mapo>
						</Text>
					</div>
				</div>
			</div>
		</>
	);
}

export default Map;
