import React from 'react';
import style from './MemberTab.module.css';
import { Tabs } from 'antd';

const defaultMembers = [
    {
        departmentName: '核心團隊',
        departmentImage: 'https://i.seadn.io/gcs/files/74e5cd691632cad888b4f615827ac5f2.png?auto=format',
        members: [
            {
                section: '總招',
                name: 'Theo',
            },
            {
                section: '總招',
                name: 'Theo',
            },
            {
                section: '總招',
                name: 'Theo',
            },
            {
                section: '總招',
                name: 'Theo',
            },
            {
                section: '總招',
                name: 'Theo',
            },
            {
                section: '總招',
                name: 'Theo',
            },
        ],
    },
    {
        departmentName: '策展部',
        departmentImage: 'https://i.seadn.io/gae/ZGsGPKiUHiQx2cosXFVUWw4K7YgE-FpgmVenPWBe0OfpHZK4AaOwCvkfT8SlJZx0BujDl5zOYI7dPPN46xCWsMDSm_1F9fKn_TtlbQ?auto=format',
        members: [
            {
                section: '數位組',
                name: '邱冠銘',
            },
            {
                section: '數位組',
                name: 'Kobe Mary',
            },
            {
                section: '數位組',
                name: '李汶凌',
            },
            {
                section: '數位組',
                name: '胡海晴',
            },
            {
                section: '數位組',
                name: '陳翰文',
            },
            {
                section: '數位組',
                name: '林俊佑',
            },
            {
                section: '活動組',
                name: 'xxx',
            },
            {
                section: '活動組',
                name: 'xxx',
            },
            {
                section: '活動組',
                name: 'xxx',
            },
            {
                section: '活動組',
                name: 'xxx',
            },
            {
                section: '展覽組',
                name: 'xxx',
            },
            {
                section: '展覽組',
                name: 'xxx',
            },
            {
                section: '展覽組',
                name: 'xxx',
            },
            {
                section: '展覽組',
                name: 'xxx',
            },
            {
                section: '展覽組',
                name: 'xxx',
            },
        ],
    },
    {
        departmentName: '行政部',
        departmentImage: 'https://i.seadn.io/gcs/files/a8b3e484f6ec637b551f727255364479.png?auto=format',
        members: [
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
            {
                section: 'xx組',
                name: '行政部的人',
            },
        ],
    },
    {
        departmentName: '公關部',
        departmentImage: 'https://i.seadn.io/gae/tru7H_Rgi1tFz_X7ke3OZp-xOYUh2WdifeS0-HSQmZBgOGt9zY64At9364GXXHUxBPuS8gz3eFTNo2xnVgp_D8h_vFKvwy_Va6Wo?auto=format',
        members: [
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
            {
                section: 'xx組',
                name: '公關部的人',
            },
        ],
    },
    {
        departmentName: '設計部',
        departmentImage: 'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
        members: [
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
            {
                section: 'xx組',
                name: '設計部的人',
            },
        ],
    }
]

const MemberTab = ({members = defaultMembers}) => {
    const handleProcess = (department, idx) => {
        return {
            label: department.departmentName,
            key: idx,
            children:
                (<div className={style.department}>
                    <div className={style.imageContainer}>
                        <img alt='team img' src={department.departmentImage} />
                    </div>
                    <div className={style.memberContainer}>
                        {department.members.map((member, idx) => (
                            <div key={idx} className={style.member}>
                                <span className={style.memberName}>{member.section}</span>
                                <span>{member.name}</span>
                            </div>
                        ))}
                    </div>
                </div>),
        }
    };

    return (
        <div className={style.container}>
            <Tabs
                centered
                defaultActiveKey="1"
                items={members.map((department, idx) => handleProcess(department, idx))}>
            </Tabs>
        </div>
    );
};
export default MemberTab;

