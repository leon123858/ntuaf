import { useRouteError } from 'react-router-dom';
import style from './error-page.module.css';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id='error-page'>
			<section class={style.page_404}>
				<div>
					<div>
						<div>
							<div>
								<div class={style.four_zero_four_bg}>
									<h1>{error.status || '500'}</h1>
								</div>

								<div class={style.contant_box_404}>
									{error.statusText && <h3 class='h2'>{error.statusText}</h3>}
									<>
										{error.message && <p>錯誤訊息: {error.message}</p>}
										<p>
											若有相關建議或問題, 歡迎到我們的{' '}
											<a
												style={{
													color: 'blue',
													textDecorationLine: 'underline',
												}}
												href='https://github.com/leon123858/ntuaf/issues'
											>
												github
											</a>{' '}
											發起議題 "issue"
										</p>
										<p>或是傳訊至台大藝術季臉書粉絲專頁描述問題</p>
									</>

									<a href='/' class={style.link_404}>
										回首頁
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
