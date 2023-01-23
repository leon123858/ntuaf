import { db } from '../init';
const cliProgress = require('cli-progress');

const insertSample = async () => {
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
	const cityRef = db.collection('cities').doc('BJ');
	const res = await cityRef.set(
		{
			capital: true,
		},
		{ merge: true }
	);
	bar.increment(1);
	bar.stop();
};

export { insertSample };
