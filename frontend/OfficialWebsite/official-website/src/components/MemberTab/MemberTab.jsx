import React, { useContext, useState, useEffect } from 'react';
import style from './MemberTab.module.css';
import { Tabs } from 'antd';
import { BreakPointContext } from '../../useBreakPoint';
import { getMembersByDepartment } from '@leon123858/ntuaf-sdk'

const departmentNames = ['核心團隊', '設計部', '行政部', '公關部', '策展部']

const PositionRow = ({ members, position }) => {
    return (
        <div className={style.positionRow}>
            <p style={{ margin: 0 }}>{position}</p>
            <div className={style.memberContainer}>
                {members.map((member, idx) => (
                    (member.job === position)
                        ? (
                            <div key={idx} className={style.member}>
                                <span>{member.name}</span>
                            </div>
                        ) : ''
                ))}
            </div>
        </div>
    )
}

const MemberTab = () => {
    const { inBreakPoint } = useContext(BreakPointContext);
    const [curDepartment, setCurDepartment] = useState('');
    const [memberData, setMemeberData] = useState([]);

    const fetchData = async () => {
        const k = await getMembersByDepartment('策展部');
        setMemeberData(k);
    }

    const onChange = (key) => {
        setCurDepartment(key);
    }

    useEffect(() => {
       fetchData(curDepartment)
    }, [curDepartment]);

    const handleProcess = (members) => {
        return (
                <div className={(inBreakPoint) ? style.department : style.lgDepartment}>
                    <img
                        alt='team img'
                        src='https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format'
                        className={(inBreakPoint) ? style.img : style.lgImg}
                    />
                    {
                        (curDepartment === '核心團隊')
                            ? (
                                <div>
                                    <PositionRow members={members} position={"總招"} />
                                    <PositionRow members={members} position={"副招"} />
                                    <PositionRow members={members} position={"執秘"} />
                                </div>
                            )
                            : (
                                <div>
                                    <PositionRow members={members} position={"部長"} />
                                    <PositionRow members={members} position={"部員"} />
                                </div>
                            )
                    }
                </div>
            )
    };

    return (
        <div className={style.container}>
            <Tabs
                centered
                defaultActiveKey="1"
                size='large'
                items={
                    departmentNames.map((departmentName, i) => {
                        return {
                            label: departmentName,
                            key: departmentName,
                            children: handleProcess(memberData),
                        };
                    }
                )}
                onChange={onChange}
            >
            </Tabs>
        </div>
    );
};
export default MemberTab;
