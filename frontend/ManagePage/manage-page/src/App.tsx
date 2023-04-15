import React, { useEffect } from 'react';
import {
	// ChromeFilled,
	CrownFilled,
	SmileFilled,
	HomeFilled,
	ProjectFilled,
} from '@ant-design/icons';
import { PageContainer, ProLayout, ProCard } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { Button, message } from 'antd';
import { useState } from 'react';
import {
	login,
	logout,
	userId,
	subscriptAuthState,
	getMemberInfo,
} from '@leon123858/ntuaf-sdk';

import { Home, Auth, Update, Support, Post } from './component';
// set each page component

enum PATH_NAME {
	Home = '/',
	AUTH = '/auth',
	UPDATE = '/update',
	SUPPORT = '/support',
	POST = '/post',
}
const path2component: { [key: string]: (params: any) => JSX.Element } = {};
path2component[PATH_NAME.Home] = (params: any) => <Home />;
path2component[PATH_NAME.AUTH] = (params: any) => <Auth user={params} />;
path2component[PATH_NAME.UPDATE] = (params: any) => (
	<Update email={params.email} admin={params.admin} />
);
path2component[PATH_NAME.SUPPORT] = (params: any) => <Support />;
path2component[PATH_NAME.POST] = (params: any) => <Post />;

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
			// {
			// 	path: PATH_NAME.SUPPORT,
			// 	name: '相關協助',
			// 	icon: <ChromeFilled />,
			// },
			{
				path: PATH_NAME.POST,
				name: '查看投稿',
				icon: <ProjectFilled />,
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
	const [memberInfo, setMemberInfo] = useState(
		{} as { name?: string; admin?: string[]; email: string }
	);
	// console.log('member info', memberInfo);
	useEffect(() => {
		subscriptAuthState(async (user: any) => {
			userId() ? setLogin(true) : setLogin(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isLogin) {
			(async () => {
				// console.log('fetch user info');
				try {
					const { name, admin, id } = (await getMemberInfo()) as {
						name: string;
						admin: string[];
						id: string;
					};
					message.success('Logged in', 2);
					setMemberInfo({ name, admin, email: id });
				} catch (e) {
					console.log(e);
					await message.error('You have no permission', 2);
					await logout().then(() => {
						message.info('Logged out', 2);
						setLogin(false);
					});
				}
			})();
		}
	}, [isLogin]);

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
				menuItemRender={(item, dom) =>
					isLogin ? (
						<h1
							onClick={() => {
								if (Object.values(PATH_NAME).includes(item.path as PATH_NAME))
									setPath(item.path as PATH_NAME);
								else setPath(PATH_NAME.Home);
							}}
						>
							{dom}
						</h1>
					) : null
				}
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
							minHeight: '100vh',
						}}
					>
						{path2component[pathname](memberInfo)}
					</ProCard>
				</PageContainer>
			</ProLayout>
		</ProConfigProvider>
	);
}

export default App;
