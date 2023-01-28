import React, { useEffect } from 'react';
import {
	ChromeFilled,
	CrownFilled,
	SmileFilled,
	HomeFilled,
} from '@ant-design/icons';
import { PageContainer, ProLayout, ProCard } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { Button } from 'antd';
import { useState } from 'react';
import {
	login,
	logout,
	userId,
	subscriptAuthState,
} from '@leon123858/ntuaf-sdk';
import { Home, Auth, Update, Support } from './component';

// set each page component

enum PATH_NAME {
	Home = '/',
	AUTH = '/auth',
	UPDATE = '/update',
	SUPPORT = '/support',
}
const path2component: { [key: string]: (params: any) => JSX.Element } = {};
path2component[PATH_NAME.Home] = (params: any) => <Home />;
path2component[PATH_NAME.AUTH] = (params: any) => <Auth />;
path2component[PATH_NAME.UPDATE] = (params: any) => <Update />;
path2component[PATH_NAME.SUPPORT] = (params: any) => <Support />;

// router for menu
const defaultProps = {
	logo: 'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ',
	route: {
		path: PATH_NAME.Home,
		routes: [
			{
				path: PATH_NAME.Home,
				name: '首頁',
				icon: <HomeFilled />,
			},
			{
				path: PATH_NAME.AUTH,
				name: '個人權限',
				icon: <CrownFilled />,
			},
			{
				path: PATH_NAME.UPDATE,
				name: '更新事件',
				icon: <SmileFilled />,
			},
			{
				path: PATH_NAME.SUPPORT,
				name: '相關協助',
				icon: <ChromeFilled />,
			},
		],
	},
	location: {
		pathname: PATH_NAME.Home,
	},
};

function App() {
	const [pathname, setPath] = useState(PATH_NAME.Home);
	const [isLogin, setLogin] = useState(false);
	useEffect(() => {
		subscriptAuthState((user: any) => {
			if (userId()) {
				setLogin(true);
			} else {
				setLogin(false);
			}
			console.log(userId());
		});
	}, []);

	return (
		<ProConfigProvider dark={true}>
			<ProLayout
				{...defaultProps}
				location={{
					pathname,
				}}
				title='NTUAF28 管理頁'
				menuFooterRender={(props) => {
					if (props?.collapsed) return undefined;
					return (
						<p
							style={{
								textAlign: 'center',
								paddingBlockStart: 12,
								color: 'white',
							}}
						>
							NTUAF28 manage page
						</p>
					);
				}}
				menuItemRender={(item, dom) => (
					<h1
						onClick={() => {
							if (Object.values(PATH_NAME).includes(item.path as PATH_NAME))
								setPath(item.path as PATH_NAME);
							else setPath(PATH_NAME.Home);
						}}
					>
						{dom}
					</h1>
				)}
			>
				<PageContainer
					extra={
						!isLogin
							? [
									<Button
										key='1'
										type='primary'
										onClick={async () => {
											await login();
										}}
									>
										登入
									</Button>,
							  ]
							: [
									<Button
										key='1'
										type='dashed'
										onClick={async () => {
											await logout();
											setLogin(false);
										}}
									>
										登出
									</Button>,
							  ]
					}
					footer={[]}
				>
					<ProCard
						style={{
							height: '200vh',
							minHeight: 800,
						}}
					>
						{path2component[pathname]({})}
					</ProCard>
				</PageContainer>
			</ProLayout>
		</ProConfigProvider>
	);
}

export default App;
