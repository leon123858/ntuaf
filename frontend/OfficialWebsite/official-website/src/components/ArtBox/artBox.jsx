import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from "./artBox.module.css"
const { Meta } = Card;
const artBox = (props) => {
    console.log(props);
    const mystyle = {
        width : `${props.width}%`
    }
    const imageHeight = props.imageWidth*9/16
    return(
        <Card
            style={mystyle}
            cover={
            <img
                alt="example"
                src={props.arturl}
                style = {{
                    width : 300,
                    height : `${imageHeight}%`
                }}
            />
            }
        >
            <div className={styles.container}>
                <Meta
                title={props.artName}
                description={props.artist}
                style={{
                    width: 100,
                }}
                className={styles.left}
                >
                </Meta>
                <HeartOutlined className={styles.right}
                style={{ fontSize: '45px', color: 'red' }}
                />
            </div>
        </Card>
    )
};
export default artBox;