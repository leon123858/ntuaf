import { connectEmulator } from '../src/utils/connectEmulator';

before(async () => {
	console.log('start test');
	connectEmulator();
});

after(async () => {
	console.log('end test');
});
