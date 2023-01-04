import "./Footer.css"
import {InstagramOutlined, FacebookOutlined} from '@ant-design/icons';

const Footer = ()=>{

    return (
        <div className="footerWrapper">
            <div className="title">
                <span className="logo">LOGO</span>
                <h2>台大藝術季28th</h2>
                
            </div>
            <hr></hr>
            <div className="infoWrapper">
                <div>
                <h3>聯絡我們</h3>
                <p>羅斯福路</p>
                <p>ntuartfest@gmail</p>
                </div>
                <div className="iconGroup">
                    <a href="https://www.instagram.com/"><InstagramOutlined/></a>
                    <a href="https://www.facebook.com/"><FacebookOutlined /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer