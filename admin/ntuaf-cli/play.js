
// require moment from "moment"
const moment = require('moment');
const cliProgress = require('cli-progress');
const afStart = moment('04/20/2023', 'MM/DD/YYYY')
const afend = moment('05/20/2023', 'MM/DD/YYYY')
console.log(moment(afStart).add("3", "day").format("MM-DD-YYYY") )
console.log(afend.diff(afStart, "days"))
console.log(afend.diff(afStart, "days"))

// console.log(timeStamp, timeStamp.valueOf())