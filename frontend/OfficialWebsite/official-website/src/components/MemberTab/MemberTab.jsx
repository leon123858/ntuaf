import React, {useContext} from 'react';
import style from './MemberTab.module.css';
import { Tabs } from 'antd';
import { BreakPointContext } from '../../useBreakPoint';


const defaultMembers = [
    {
        departmentName: '核心團隊',
        departmentImage: 'https://i.seadn.io/gcs/files/74e5cd691632cad888b4f615827ac5f2.png?auto=format',
        members: [
            {
                position: '總招',
                name: 'Theo',
            },
            {
                position: '副招',
                name: 'Theo',
            },
            {
                position: '副招',
                name: 'Theo',
            },
            {
                position: '副招',
                name: 'Theo',
            },
            {
                position: '執秘',
                name: 'Theo',
            },
        ],
    },
    {
        departmentName: '策展部',
        departmentImage: 'https://i.seadn.io/gae/ZGsGPKiUHiQx2cosXFVUWw4K7YgE-FpgmVenPWBe0OfpHZK4AaOwCvkfT8SlJZx0BujDl5zOYI7dPPN46xCWsMDSm_1F9fKn_TtlbQ?auto=format',
        members: [
            {
                position: '部長',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
            {
                position: '部員',
                name: '策展',
            },
        ],
    },
    {
        departmentName: '行政部',
        departmentImage: 'https://i.seadn.io/gcs/files/a8b3e484f6ec637b551f727255364479.png?auto=format',
        members: [
            {
                position: '部長',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
            {
                position: '部員',
                name: '行政',
            },
        ],
    },
    {
        departmentName: '公關部',
        departmentImage: 'https://i.seadn.io/gae/tru7H_Rgi1tFz_X7ke3OZp-xOYUh2WdifeS0-HSQmZBgOGt9zY64At9364GXXHUxBPuS8gz3eFTNo2xnVgp_D8h_vFKvwy_Va6Wo?auto=format',
        members: [
            {
                position: '部長',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
            {
                position: '部員',
                name: '公關',
            },
        ],
    },
    {
        departmentName: '設計部',
        departmentImage: 'https://i.seadn.io/gcs/files/9d1db9251715abbf63586037840a319c.png?auto=format',
        members: [
            {
                position: '部長',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
            {
                position: '部員',
                name: '設計',
            },
        ],
    }
]

const PositionRow = ({department, position}) => {
    return (
        <div className={style.positionRow}>
            <p style={{ margin: 0 }}>{position}</p>
            <div className={style.memberContainer}>
                {department.members.map((member, idx) => (
                    (member.position === position)
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

const MemberTab = ({members = defaultMembers}) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    const handleProcess = (department, idx) => {
        return {
            label: department.departmentName,
            key: idx,
            children: (
                <div className={(inBreakPoint) ? style.department : style.lgDepartment}>                    
                    <img 
                        alt='team img' 
                        src={department.departmentImage} 
                        className={(inBreakPoint) ? style.img : style.lgImg} 
                    />
                    {
                        (department.departmentName === '核心團隊')
                        ? (
                            <div>
                                <PositionRow department={department} position={"總招"} />
                                <PositionRow department={department} position={"副招"} />
                                <PositionRow department={department} position={"執秘"} />
                            </div>
                        )
                        : (
                            <div>
                                <PositionRow department={department} position={"部長"} />
                                <PositionRow department={department} position={"部員"} />
                            </div>
                        )
                    } 
                </div>
            ),
        }
    };

    return (
        <div className={style.container}>
            <Tabs
                centered
                defaultActiveKey="1"
                size='large'
                items={members.map((department, idx) => handleProcess(department, idx))}>
            </Tabs>
        </div>
    );
};
export default MemberTab;
