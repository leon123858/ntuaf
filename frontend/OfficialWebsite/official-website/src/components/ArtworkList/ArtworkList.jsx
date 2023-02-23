import {React, useState, useEffect} from 'react';
import { Card, Modal } from 'antd';
import { ArtworkText, ArtworkImg } from './Artwork';
import styled from 'styled-components';
import { getArtworkList } from '@leon123858/ntuaf-sdk';
const test = {
    id: 123,
    type: 123,
    name: "作者名稱",
    artworkName: "作品名稱",
    email: 123,
    url: 123,
    text: "這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，這是一篇很長的文章，因為我要讓她很長我才可以用點點點表示最後面，",
    createTime: 123,
    like: 123,
    tmpLike: 123,
}
const Container = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px
`

export const ArtworkList = () => {
    const [open, setOpen] = useState(false)
    const [display, setDisplay] = useState()
    const [data, setData] = useState()
    return (
        <Container>
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
            <ArtworkImg data={data} />
        </Container>
    )
}