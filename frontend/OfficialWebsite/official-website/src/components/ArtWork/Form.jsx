import { UploadOutlined } from '@ant-design/icons';
import {
	Button,
	Form,
	Input,
	Select,
	Spin,
	Upload,
	message,
	Modal,
	Typography,
	Alert,
} from 'antd';
import { useState, useContext } from 'react';
import { createArtwork, ARTWORK_TYPE } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../../useBreakPoint';
import style from './Form.module.css';
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const FormDisabledDemo = () => {
	const [form] = Form.useForm();
	// const [componentDisabled, setComponentDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	// const [imageSrc, setImageSrc] = useState('');
	const [hidden, setHidden] = useState(true);
	const [fileList, setFileList] = useState([]);

	const [previewVisible, setPreviewVisible] = useState(false);
	// const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');

	const { inBreakPoint, isLogin } = useContext(BreakPointContext);
	// eslint-disable-next-line no-unused-vars
	const [_, contextHolder] = Modal.useModal();

	const goBack = () => {
		window.location = '/Artwork';
	};

	const onFinish = async (values) => {
		if (loading) return;
		setLoading(true);
		values.img = previewImage;
		values.url = previewImage;
		try {
			await createArtwork(values);
		} catch (err) {
			console.log('上傳失敗', err);
			message.error('上傳失敗');
			setLoading(false);
			return;
		}
		handleRemove();
		message.success('上傳成功', 3, goBack);
		setLoading(false);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	// const [imageUrl, setImageUrl] = useState();

	const handleCancel = () => setPreviewVisible(false);

	const normFile = (e) => {
		// console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return previewImage;
		}
		return [previewImage];
	};

	// const beforeUpload = (file) => {
	//     setFileList([file]);
	//     return false;
	// };

	const handleRemove = () => {
		form.resetFields();
		setFileList([]);
		URL.revokeObjectURL(previewImage);
		setPreviewImage('');
	};

	const uploadButton = (
		<div>
			<UploadOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);

	const localPreview = async (options) => {
		setLoading(true);
		let isOK = true;
		const file = options.file;
		// setFileList([file]);
		const isLt2M = file.size > 25 * 1024 * 1024;
		// console.log('options', options);
		// console.log('file size', file.size);

		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			setLoading(false);
			alert('You can only upload JPG/PNG file!');
			isOK = false;
			//setLoading(false);
		} else if (isLt2M) {
			alert('Image must smaller than 25 MB!');
			isOK = false;
			setLoading(false);
		}

		if (isOK) {
			// console.log('file', file);
			const url = URL.createObjectURL(file);
			const preview = [
				{
					uid: '-1',
					name: options.file.name,
					url: url,
					status: 'done',
				},
			];
			setFileList(preview);
			setPreviewImage(url);
			setPreviewTitle(options.file.name);
			// console.log('img url ', url);
			// console.log('name', options.file.name);
		}
		setLoading(false);
	};

	function handleChange(value) {
		// console.log(`Selected ${value}`);
		// console.log(form.getFieldValue('type'));
		if (
			form.getFieldValue('type') === ARTWORK_TYPE.PHOTO ||
			form.getFieldValue('type') === ARTWORK_TYPE.PAINTING
		)
			setHidden(false);
		else setHidden(true);
	}

	return (
		<>
			<div
				className={inBreakPoint ? style.sm : style.lg}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<div className={style.wordsContainer}>
					<Typography>
						<Title className={style.title} style={{ textAlign: 'center' }}>
							洄溯展覽上傳專區
						</Title>
						<Paragraph>
							<span className={style.content}>
								注意事項：
								<br></br>
								1.參與者不限年齡、學校。
								<br></br>
								2.作品內容需與主題相關，文字內容得以任何形式呈現。
								<br></br>
								3.不得包含色情、裸露、猥褻、暴力及其他具爭議性或不當題材內容。
								<br></br>
								4.不得抄襲。
							</span>
						</Paragraph>
					</Typography>
				</div>
				<div className={style.formContainer}>
					<Form
						disabled={!isLogin}
						layout='vertical'
						style={{
							// maxWidth: 600,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							margin: inBreakPoint ? '40px 20px' : 50,
							// backgroundColor : 'gray',
							// alignItems: 'center',
						}}
						form={form}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						initialValues={{
							remember: true,
							img: previewImage,
						}}
					>
						<Alert
							style={{ display: !isLogin ? '' : 'none', marginBottom: '15px' }}
							message='Hey yo!'
							description='您需要登入才能上傳作品'
							type='info'
							showIcon
							closable
						/>
						<div className={style.formTitle}>留下你的創作吧！</div>
						<Form.Item
							label='姓名／暱稱'
							rules={[{ required: true, message: '請輸入您的名字' }]}
							name='name'
							// style={{ display:'flex',alignSelf: 'center' }}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='參與組別'
							name='type'
							rules={[{ required: true, message: '請選擇組別' }]}
						>
							<Select onChange={handleChange} style={{ width: '120px' }}>
								<Select.Option value={ARTWORK_TYPE.PURE_TEXT}>
									文字組
								</Select.Option>
								<Select.Option value={ARTWORK_TYPE.PHOTO}>照片組</Select.Option>
								<Select.Option value={ARTWORK_TYPE.PAINTING}>
									繪畫組
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							label='作品名稱'
							name='artworkName'
							rules={[{ required: true, message: '請上傳您的作品名稱' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='文字說明'
							name='text'
							rules={[{ required: true, message: '請上傳您的作品文字說明' }]}
						>
							<TextArea rows={4} />
						</Form.Item>

						<Form.Item
							name='url'
							label='上傳檔案（限 jpg, jpeg, png 檔；大小限制 10MB 以內）'
							value=''
							getValueFromEvent={normFile}
							rules={[
								{
									required:
										form.getFieldValue('type') === ARTWORK_TYPE.PHOTO ||
										form.getFieldValue('type') === ARTWORK_TYPE.PAINTING
											? true
											: false,
									message: '請上傳您的作品照片',
								},
							]}
							// style={{ display: "none" }}
							hidden={hidden}
						>
							<div>
								<Upload
									accept='image/*'
									listType='picture-card'
									customRequest={localPreview}
									// beforeUpload={beforeUpload}
									multiple={false}
									onRemove={handleRemove}
									onPreview={() => setPreviewVisible(true)}
									fileList={fileList}
								>
									{previewImage ? null : uploadButton}
								</Upload>
								<Modal
									open={previewVisible}
									title={previewTitle}
									footer={null}
									onCancel={handleCancel}
								>
									<img
										alt='upload'
										style={{ width: '50%' }}
										src={previewImage}
									/>
								</Modal>
								<Spin spinning={loading} />
							</div>
						</Form.Item>
						<div className={style.submit}>
							<Form.Item>
								<Button htmlType='submit'>提交</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
			{contextHolder}
		</>
	);
};
export default FormDisabledDemo;
