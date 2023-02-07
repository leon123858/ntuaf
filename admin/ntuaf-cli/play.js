const cliProgress = require('cli-progress');

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// start the progress bar with a total value of 200 and start value of 0

bar1.start(200, 0);

// update the current value in your application..
bar1.update(10);
bar1.increment()
// stop the progress bar
bar1.stop();