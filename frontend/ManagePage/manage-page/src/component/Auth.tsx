import React from 'react';
import { Space, Table, Tag, Button, Modal, Typography} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getEvent } from '@leon123858/ntuaf-sdk'
import { useState } from 'react';
import moment from 'moment';



const { Title, Paragraph, Text } = Typography;

function Auth({user}:{user:any}) {

	
	console.log("user",(user));
	const data = user;
	const [isModalOpen, ModalOpen] = useState(false);

	const eventdata: any = {
		startTime: 1234, 
		endTime: 1684425600000, 
		place: {
			name: "name_cad0160f-fcc9-4d0c-9300-33b50f8eeede",
			url: "https://e5c3dba2-9d06-4bc9-a9ca-dd6b85f924ec",
		}, 
		image: {
			banner : "628f6077-23e5-4a73-a5f2-d7fe10023c76",
			card : "d577bd3c-b7c1-4eb5-98c5-3ba32e6dc082",
		}, 
		type: '展覽',
	};
	const [curdata, setData] = useState(eventdata);



	let event;
	const showModal = () => {
		ModalOpen(true);
	  };
	
	  const handleOk = () => {
		ModalOpen(false);
	  };
	
	  const handleCancel = () => {
		ModalOpen(false);
	  };

	function MyModalComponent(props){
		showModal();
	}
	const columns: any = [
		{
		  title: '事件編號',
		  //dataIndex: 'name',
		  key: 'name',
		//   render: (text:any) => <span>{text}</span>,
		},
		{
			title: '動作',
			key: 'action',
			render: (text, record) => (
				<Space>
					<Button 
					type="primary"
					onClick={async() =>{
						//alert(text);
						event =  await getEvent(text);
						console.log("event",event);
						MyModalComponent(event);
						event.startTime = moment(event.startTime).format('MM-DD-YYYY');
						event.endTime = moment(event.endTime).format('MM-DD-YYYY');
						setData(event);
					}}
					>
						查詢
					</Button>

					<Modal title={curdata.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
						<div>
							類別 : {curdata.type}
						</div>
						<div>
							開始時間 : {curdata.startTime}
						</div>
						<div>
							結束時間 : {curdata.endTime}
						</div>
						<div>
							地點 :{
								curdata.place.name
							}
							<br></br>
							<a href={curdata.place.url}>{curdata.place.url}</a>
						</div>
					</Modal>
				</Space>
			),
		},
		
	  ];

	return (
		<>
			<div>
			<Title level={2}>使用者名稱：</Title>
			<Title level={4}>{user.name}</Title>
			</div>
			<div>
			<Title level={2}>信箱：</Title>
			<Title level={4}>{user.email}</Title>
			</div>
			<Table columns={columns} dataSource={user.admin} />
		</>
	);
}

export default Auth;
