import React from 'react';
import style from './Link.module.css';
import { Button } from 'antd';


const Link = ({ url, title }) => {

    return (
        <div className={style.btn}>
            <Button style={{backgroundColor: 'grey', color: 'white'}}>{title} {'>'}</Button>
        </div>
    );
}


export default Link;