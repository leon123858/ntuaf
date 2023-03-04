import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Typography } from 'antd';
const { Meta } = Card;
const { Paragraph, Text } = Typography;
const test = {
    id: 123,
    type: 123,
    name: "作者名稱",
    email: 123,
    url: 123,
    text: "這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，",
    createTime: 123,
    like: 123,
    tmpLike: 123,
}

export const ArtworkText = ({ data = test }) => {
    return (
        <Card bordered={false} style={{ width: 300 }}>
            <h2>作品名稱</h2>
            <br />
            <Paragraph
                style={{ width: "80%" }}
                ellipsis={
                    {
                        rows:2
                    }
                }
            >
                {data.text}
            </Paragraph>
        </Card>
    )
}