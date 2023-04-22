import React, { useContext, useState } from 'react';
import style from './ImageList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';
import { Slider, Image } from 'antd';
import TextBox from '../Textbox/TextBox';

const ImageList = ({ data }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	const [curPic, setCurPic] = useState(0);
	return {
		[BlOCK_TYPE.IMAGE_LIST_A]: (
			<div className={style.container}>
				<p className={style.topic}>{data.topic}</p>

				<div className={(inBreakPoint) ? style.imgListA : style.lgImgListA}>
					{data.items.map((image, idx) => (
						<div key={idx}>
							<Image src={image.url} width='95%' style={{ borderRadius: 10 }} />
						</div>
					))}
				</div>
			</div>
		),
		[BlOCK_TYPE.IMAGE_LIST_B]: (
			<div className={style.container}>
				<Image src={data.items[curPic].url} width={(inBreakPoint) ? '90%' : '60%'}></Image>

				<div style={{ width: (inBreakPoint) ? '90%' : '60%', margin: '0 auto' }}>
					<Slider
						min={1}
						max={data.items.length}
						onChange={(e) => setCurPic(e - 1)}
					/>
				</div>
			</div>
		),
		[BlOCK_TYPE.IMAGE_LIST_C]: (
			<div className={style.container} style={(inBreakPoint) ? { margin: '60px auto 84px auto' } : { margin: '60px auto 168px auto' }}>
				{
					(data.title) ? (
						<p className={style.topic}>{data.title}</p>
					) : (<></>)
				}
				
				<div>
					{data.items.map((image, idx) => (
						<div key={idx} className={(inBreakPoint) ? style.imgItemC : style.lgImgItemC }>
							{image.url ? (
								<div className={(inBreakPoint) ? style.imgC : style.lgImgC}>
									<Image
										alt='img'
										src={image.url}
										width={'170px'}
										style={{ borderRadius: '50%' }}
									/>
								</div>
							) : (
								''
							)}
							<div key={idx}>
								<TextBox
									key={idx}
									text={{
										type: BlOCK_TYPE.TEXT_A,
										text: image.name,
										// url: image.url,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		),
		[BlOCK_TYPE.IMAGE_LIST_D]: (
			<div className={style.container} style={{ margin: "168px auto 84px auto" }}>
				<p className={style.topic}>{data.topic}</p>

				<div className={inBreakPoint ? style.imgListD : style.lgImgListD}>
					{data.items.map((image, idx) => (
						<div className={style.imgitemD} key={idx}>
							<Image src={image.url} width='85%' style={{ borderRadius: 10 }} />
							<p className={style.textD}>{image.name}</p>
						</div>
					))}
				</div>
			</div>
		),
		[BlOCK_TYPE.IMAGE_LIST_E]: (
			<div className={style.container}>
				<p className={style.topic}>{data.topic}</p>
				<div>
					{data.items.map((image, idx) => (
						<div key={idx} className={(inBreakPoint) ? style.center : idx % 2 === 0 ? style.left : style.right}>
							<TextBox
								key={idx}
								text={{
									type: BlOCK_TYPE.TEXT_A,
									text: image.name,
									url: image.url,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		),
	}[data.type];
};
export default ImageList;
