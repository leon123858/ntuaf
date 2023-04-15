import React, { useRef, useState } from 'react';
import { Select } from 'antd';
import {
	getEvent,
	Event,
	EVENT_TYPE,
	BlOCK_TYPE,
	ITEM_TYPE,
	updateEvent,
} from '@leon123858/ntuaf-sdk';
import {
	ProFormDateTimeRangePicker,
	ProFormInstance,
	ProForm,
	ProFormList,
	ProFormSelect,
	ProFormText,
	ProFormTextArea,
	ProCard,
} from '@ant-design/pro-components';
import { message } from 'antd';
import moment from 'dayjs';
import { UploadImage } from './utils/imageUpload';

interface FormEvent extends Omit<Event, 'id' | 'startTime' | 'endTime'> {
	time: [number, number];
}

function Update({ email, admin }: { email: string; admin: string[] }) {
	const formRef = useRef<ProFormInstance<FormEvent>>();
	const [disableForm, setDisableForm] = useState(true);
	const [eventId, setEventId] = useState('');
	const [imageCard, setImageCard] = useState('');
	const [imageBanner, setImageBanner] = useState('');
	return (
		<>
			<h1>更新用戶管理事件(可以挑選事件號碼)</h1>
			<Select
				defaultValue={eventId}
				style={{ width: 600 }}
				onChange={async (value: string) => {
					setDisableForm(true);
					if (value === '') {
						return;
					}
					setEventId(value);
					const event = await getEvent(value);
					const formEvent: FormEvent = {
						...event,
						time: [event.startTime, event.endTime],
					};
					setImageCard(event.image.card);
					setImageBanner(event.image.banner);
					formRef.current?.setFieldsValue(formEvent);
					setDisableForm(false);
				}}
				options={admin.map((v) => {
					return { value: v, label: v };
				})}
			/>
			<hr></hr>
			裁切圖片工具:
			<UploadImage
				setUrl={(url: string) => {
					const el = document.createElement('textarea');
					el.value = url;
					document.body.appendChild(el);
					el.select();
					document.execCommand('copy');
					document.body.removeChild(el);
					message.success('已複製上傳圖片網址, 可至下方文字框貼上');
				}}
				text='上傳圖片且複製'
				wantCrop
			></UploadImage>
			<hr></hr>
			{/* eslint-disable-next-line react/jsx-no-target-blank */}
			<a
				href={`https://ntuaf28-dev.firebaseapp.com/display/${eventId}`}
				target='_blank'
				style={disableForm ? { pointerEvents: 'none' } : {}}
			>
				{disableForm ? '請選擇編輯對象' : '實際網址跳轉'}
			</a>
			<hr></hr>
			<ProForm<FormEvent>
				onFinish={async (values) => {
					try {
						const newEvent: Event = {
							...values,
							startTime: values.time[0],
							endTime: values.time[1],
							id: eventId,
						};
						await updateEvent(newEvent);
					} catch (err) {
						console.log(err);
						message.error('提交失敗');
						return;
					}
					message.success('提交成功');
				}}
				formRef={formRef}
				params={{ id: '100' }}
				formKey='base-form-use-demo'
				autoFocusFirstInput
				disabled={disableForm}
			>
				<ProForm.Group>
					<ProFormText
						width='md'
						name='title'
						label='標題'
						required
						placeholder='請輸入標題'
						tooltip='最長 X 個字'
						rules={[{ required: true, message: '必填' }]}
						addonAfter={<span>最長 X 個字</span>}
					/>
					<ProFormText
						width='md'
						name='topic'
						label='主題'
						placeholder='工作坊/講座要有主題'
						tooltip='最長 X 個字'
						addonAfter={<span>最長 X 個字</span>}
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormDateTimeRangePicker
						name='time'
						addonBefore={<span>時間範圍：</span>}
						required
						transform={(value) => {
							const startTime = moment(value[0]).unix() * 1000;
							const endTime = moment(value[1]).unix() * 1000;
							return {
								time: [startTime, endTime],
							};
						}}
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect
						options={Object.values(EVENT_TYPE).map((v) => {
							return { value: v, label: v };
						})}
						required
						width='md'
						name='type'
						label='類別'
					/>
				</ProForm.Group>
				<ProForm.Group>
					<h1>地點</h1>
					<ProFormText width='md' name={['place', 'name']} label='地點名稱' />
					<ProFormText
						width='md'
						name={['place', 'url']}
						label='地點 google 地圖網址'
					/>
				</ProForm.Group>
				<ProForm.Group>
					<UploadImage
						setUrl={(url: string) => {
							formRef.current?.setFieldsValue({ image: { banner: url } });
						}}
					></UploadImage>
					<ProFormText
						width='md'
						name={['image', 'banner']}
						addonAfter={
							<a href={imageBanner} target='_blank' rel='noreferrer'>
								原圖
							</a>
						}
						label='橫幅圖片網址'
					/>
				</ProForm.Group>
				<br></br>
				<ProForm.Group>
					<UploadImage
						setUrl={(url: string) => {
							formRef.current?.setFieldsValue({ image: { card: url } });
						}}
					></UploadImage>
					<ProFormText
						width='md'
						name={['image', 'card']}
						addonAfter={
							<a href={imageCard} target='_blank' rel='noreferrer'>
								原圖
							</a>
						}
						label='方形圖片網址'
					/>
				</ProForm.Group>
				<br></br>
				<ProFormList name='blocks'>
					{() => {
						return (
							<ProCard style={{ backgroundColor: 'GrayText', margin: '20px' }}>
								<ProFormSelect
									options={Object.values(BlOCK_TYPE)
										.filter((v) => isNaN(Number(v)))
										.map((v) => {
											return {
												value: BlOCK_TYPE[v as keyof typeof BlOCK_TYPE],
												label: v,
											};
										})}
									placeholder='區塊類別'
									required
									width='md'
									name='type'
									label='類別'
								></ProFormSelect>
								<ProFormTextArea
									width='md'
									name='title'
									placeholder='請輸入標題'
								></ProFormTextArea>
								<ProFormTextArea
									width='md'
									name='text'
									placeholder='請輸入文字敘述'
								></ProFormTextArea>
								<UploadImage
									setUrl={(url: string) => {
										const el = document.createElement('textarea');
										el.value = url;
										document.body.appendChild(el);
										el.select();
										document.execCommand('copy');
										document.body.removeChild(el);
										message.success('以複製上傳圖片網址, 可至下方文字筐貼上');
									}}
									text='上傳圖片且複製'
								></UploadImage>
								<ProFormTextArea
									width='md'
									name='url'
									placeholder='請輸入相關連結'
								></ProFormTextArea>
								<ProFormList name='items'>
									{() => {
										return (
											<ProCard
												style={{ backgroundColor: 'black', margin: '20px' }}
											>
												<ProFormSelect
													options={Object.values(ITEM_TYPE)
														.filter((v) => isNaN(Number(v)))
														.map((v) => {
															return {
																value: ITEM_TYPE[v as keyof typeof ITEM_TYPE],
																label: v,
															};
														})}
													placeholder='子項類別'
													required
													width='md'
													name='type'
													label='類別'
												></ProFormSelect>
												<UploadImage
													setUrl={(url: string) => {
														const el = document.createElement('textarea');
														el.value = url;
														document.body.appendChild(el);
														el.select();
														document.execCommand('copy');
														document.body.removeChild(el);
														message.success(
															'已複製上傳圖片網址, 可至下方文字框貼上'
														);
													}}
													text='上傳圖片且複製'
												></UploadImage>
												<ProFormTextArea
													width='md'
													name='url'
													placeholder='請輸入相關連結'
												></ProFormTextArea>
												<ProFormText
													width='md'
													name='name'
													placeholder='請輸入名稱描述'
												></ProFormText>
											</ProCard>
										);
									}}
								</ProFormList>
							</ProCard>
						);
					}}
				</ProFormList>
			</ProForm>
		</>
	);
}

export default Update;
