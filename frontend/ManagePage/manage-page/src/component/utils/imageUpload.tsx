import {
	CheckCircleOutlined,
	CloudUploadOutlined,
	FolderFilled,
} from '@ant-design/icons';
import { Button, Modal, Spin, Upload } from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import React from 'react';
import { uploadImage as uploadImageToCloud } from '@leon123858/ntuaf-sdk/dist/utils/storage';
import ImgCrop from 'antd-img-crop';

type Props = {
	setUrl: (url: string) => void;
	isUpload?: boolean | undefined;
	wantCrop?: boolean;
	text?: string;
};

export const UploadImage = (props: Props) => {
	const [previewVisible, setPreviewVisible] = React.useState(false);
	const [previewImage, setPreviewImage] = React.useState('');
	const [previewTitle, setPreviewTitle] = React.useState('');
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const [isUpload, setisUpload] = React.useState(props.isUpload ?? false);
	const [loading, setloading] = React.useState(false);
	const handleCancel = () => setPreviewVisible(false);
	React.useEffect(() => {
		if (props.isUpload !== undefined && !props.isUpload) {
			setisUpload(false);
			setFileList([]);
		}
	}, [props.isUpload]);

	const uploadButton = (
		<div>
			<FolderFilled />
			<div style={{ marginTop: 8 }}>瀏覽本機圖片</div>
		</div>
	);
	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};
	const localPreview = async (options: UploadRequestOption<any>) => {
		let isOK = true;
		const file = options.file as RcFile;
		const isLt2M = file.size > 25 * 1024 * 1024;

		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			alert('You can only upload JPG/PNG file!');
			isOK = false;
		} else if (isLt2M) {
			alert('Image must smaller than 25 MB!');
			isOK = false;
		}

		if (isOK) {
			const url = URL.createObjectURL(file);
			setPreviewImage(url);
			setPreviewTitle((options.file as RcFile).name);
			setFileList([
				{
					uid: '-1',
					name: (options.file as RcFile).name,
					status: 'done',
					url: url,
				},
			]);
			setisUpload(false);
		} else {
			setFileList([]);
			setisUpload(false);
		}
	};
	const uploadImage = async () => {
		const url = await uploadImageToCloud(previewImage);
		if (url !== null && url !== undefined) {
			URL.revokeObjectURL(previewImage);
			setPreviewImage(url);
			setPreviewTitle('已上傳');
			setFileList([
				{
					uid: '-1',
					name: '已上傳',
					status: 'done',
					url: url,
				},
			]);
			setisUpload(true);
			props.setUrl(url);
		}
	};
	return (
		<>
			{props.wantCrop ? (
				<ImgCrop>
					<Upload
						accept='image/*'
						style={{ width: 230 }}
						customRequest={localPreview}
						listType='picture-card'
						fileList={fileList}
						onPreview={() => setPreviewVisible(true)}
						onChange={handleChange}
					>
						{fileList.length === 1 ? null : uploadButton}
					</Upload>
				</ImgCrop>
			) : (
				<Upload
					accept='image/*'
					style={{ width: 230 }}
					customRequest={localPreview}
					listType='picture-card'
					fileList={fileList}
					onPreview={() => setPreviewVisible(true)}
					onChange={handleChange}
				>
					{fileList.length === 1 ? null : uploadButton}
				</Upload>
			)}

			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt='upload' style={{ width: '100%' }} src={previewImage} />
			</Modal>
			<Spin tip='Loading...' spinning={loading}>
				<Button
					type='primary'
					icon={!isUpload ? <CloudUploadOutlined /> : <CheckCircleOutlined />}
					style={{ width: 150, marginTop: 15 }}
					onClick={async () => {
						if (previewImage) {
							try {
								setloading(true);
								await uploadImage();
								if (props.isUpload === undefined) {
									setisUpload(false);
									// setFileList([]);
								}
							} catch (error) {
								alert('上傳失敗');
							} finally {
								setloading(false);
							}
						} else {
							alert('請選擇圖片');
						}
					}}
					disabled={isUpload}
				>
					{props.text ? props.text : isUpload ? '已更新' : '更新'}
				</Button>
			</Spin>
		</>
	);
};
