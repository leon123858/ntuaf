import "./Footer.css"
import {InstagramOutlined, FacebookOutlined} from '@ant-design/icons';

const Footer = ()=>{

    return (
        <div className="footerWrapper">
            <div className="title">
                <div className="logo">LOGO</div>
                <h2>台大藝術季28th</h2>
                <hr></hr>
            </div>
            <div>
                <h3>聯絡我們</h3>
                <p>羅斯福路</p>
                <p>ntuartfest@gmail</p>
                <div className="iconGroup">
                    <a><InstagramOutlined/></a>
                    <a><FacebookOutlined /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer