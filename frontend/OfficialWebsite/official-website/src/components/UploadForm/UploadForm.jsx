import React, { useContext, useState } from 'react';
import { Button, Form, Input, Radio, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import style from './UploadForm.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadForm = () => {
    const { inBreakPoint } = useContext(BreakPointContext);
    const [category, setCateGory] = useState('text');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Submit
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    // Preview
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name);
    };
    const handleCancel = () => setPreviewOpen(false);

    return (
        <div className={(inBreakPoint) ? style.container : style.lgContainer}>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                layout="vertical"
                onFinish={onFinish}
            >
                <div style={{ textAlign: 'left', padding: 24 }}>
                    <Form.Item
                        name="username"
                        label="姓名 / 暱稱"
                        rules={[{ required: true, message: '請輸入您的名字' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="radio" label="參與組別" defaultValue="text">
                        <Radio.Group defaultValue="text">
                            <Radio value="text" onClick={() => setCateGory('text')}>純文字</Radio>
                            <Radio value="photo" onClick={() => setCateGory('photo')}> 照片</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="workname"
                        rules={[{ required: true, message: '請輸入您的作品名稱' }]}
                        label="作品名稱"
                    >
                        <Input />
                    </Form.Item>

                    {
                        (category === 'text')
                            ? (
                                <Form.Item
                                    name="content"
                                    rules={[
                                        { required: true, message: '請輸入您的文字內容' },
                                        { max: 500, message: '字數超過限制' }
                                    ]}
                                    label="文字內容（500字以內）"
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            )
                            : (
                                <>
                                    <Form.Item
                                        name="description"
                                        rules={[
                                            { required: true, message: '請輸入您的文字內容' },
                                            { max: 100, message: '字數超過限制' }
                                        ]}
                                        label="文字說明（100字以內）"
                                    >
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                    <Form.Item
                                        name="file"
                                        rules={[{ required: true, message: '請上傳您的作品檔案' }]}
                                        label="上傳檔案"
                                    >
                                        <Upload.Dragger
                                            action="/upload.do"
                                            listType="picture-card"
                                            maxCount={1}
                                            onPreview={handlePreview}
                                        >
                                            <UploadOutlined /> 拖曳或點擊上傳
                                        </Upload.Dragger>
                                    </Form.Item>
                                </>
                            )
                    }
                </div>
                <Button type="primary" htmlType="submit" style={{ marginBottom: 16 }}>
                    提交
                </Button>
            </Form>
        </div>

    );
};
export default UploadForm;

