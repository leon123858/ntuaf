import { EditOutlined, EllipsisOutlined, SettingOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import styles from "./artBox.module.css"
const { Meta } = Card;
const artBox = () => {
    return(
        <Card
            style={{
            width: 400,
            }}
            cover={
            <img
                alt="example"
                src="https://wallpapercrafter.com/sizes/2048x1152/120189-Final-Fantasy-XV-video-games-Luna-Final-Fantasy-XV-Final-Fantasy.png"
            />
            }
            // actions={[
            // <SettingOutlined key="setting" />,
            // <EditOutlined key="edit" />,
            // <EllipsisOutlined key="ellipsis" />,
            // <HeartOutlined/>,
            // ]}
        >
            <div className={styles.container}>
                <Meta
                title="作品名稱"
                description="創作者姓名"
                style={{
                    width: 200,
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