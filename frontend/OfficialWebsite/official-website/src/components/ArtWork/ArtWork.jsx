// import { useState } from "react";
// import Form from "./Form";
import { Collapse , Typography , Button , Image } from 'antd';
import { Link } from 'react-router-dom';
// import Artwork from "../../routers/Artwork";
// import { upload } from "@testing-library/user-event/dist/upload";

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;


const ArtEvent = () => {

    // const [isOpened,setOpen] = useState(true);
    const titleStyle = { fontSize: '25px' };

    const onChange = (key) => {
        console.log(key);
    };
    return(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ width: '70%' }}>
            <Typography>
                    <Title style={{textAlign:"center"}}>回朔線上展覽比賽 <br></br>throw back</Title>
                    <Title></Title>
                    <Paragraph>
                    <span style={{fontSize : 20}}>
                    在持續追尋的旅程，我們不禁檢視關於過往與現在的種種，體會生命與曾有的經歷、領悟沈澱在內心深處的痕跡。

「洄溯」結合藝術季策展理念，邀請大家藉由文字、攝影或畫作，「洄」到過去，以「原點」及「終點」為主題，分享自己的經歷，同時欣賞他人的故事。
                    </span>
                    </Paragraph>
            </Typography>
            <Collapse onChange={onChange} 
            expandIconPosition='end'
            style={{ }}

            ghost>
                <Panel header={<span style={titleStyle}>比賽規則</span>} key="1" level = "2">
                <Typography>
                    <Paragraph>
                    <span style={{fontSize : 20}}>
                    1. 共分為三組：
                    純文字組
                    照片組（須附100字內說明文字）
                    繪畫組（須附100字內說明文字、可以電繪或手繪）
                    <br></br>
                    <br></br>
                    2. 展期結束後將由3位評審分別依據文字、照片、繪畫進行評選，再綜合作品獲得的愛心數量，最終分別選出三組各2名得獎者，共有6名得獎者。
                    <br></br>
                    <br></br>
                    3. 為鼓勵參與，加開2名人氣獎得獎者及10名抽獎得獎者。
                    </span>
                    </Paragraph>
                </Typography>
                </Panel>
            </Collapse>
            <Collapse onChange={onChange} 
            expandIconPosition='end'
            style={{ }}
            ghost>

                <Panel header={<span style={titleStyle}>比賽獎勵</span>} key="1">
                    <Typography>
                       
                        <Paragraph>
                        <span style={{fontSize : 20}}>
                        人氣獎（不分組取2名）：環保商品組*2
                        <br></br>
                        評審獎（分組，每組取前2名）
                        <br></br>
                        <br></br>
                        純文字組
                        <br></br>
                        首獎：鋼筆 + 評審簽名書
                        <br></br>
                        二獎：評審簽名小卡+商品
                        <br></br>
                        <br></br>
                        照片組
                        <br></br>
                        首獎：底片相機 + 評審簽名書
                        <br></br>
                        二獎：評審簽名小卡+商品
                        <br></br>
                        <br></br>
                        繪畫組
                        <br></br>
                        首獎：水彩顏料&畫本 + 評審簽名書
                        <br></br>
                        二獎：評審簽名小卡+商品
                        <br></br>
                        抽獎（不分組取10名）：韓式拍貼兌換券*10 
                        </span>
                        </Paragraph>
                    </Typography>
                </Panel>
            </Collapse>
            <div style={{ display: 'flex', justifyContent: 'right', marginBottom : '3rem' }}>
                <Button size='large' href="Artwork/upload" > 我要參賽 </Button>
            </div>
            <Link to = "/ArtworkList" >
                <Image src = "https://cdn.jwplayer.com/v2/media/pJuRvmCU/poster.jpg?width=1920"></Image>
            </Link>
            </div>
        </div>
        </>
    )
}

export default ArtEvent;