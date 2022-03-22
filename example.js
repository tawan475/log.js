const Logger = require("./log.js");
const logger = new Logger({
    consoleLog: true,
    logToFile: true,
    LogFile: "./log.log"
})

let log = logger.dir("/").dir("home/").dir("user/");
log.log("Hello World!", 1, {obj: 123, arr: [1,2,3,4,5,6,7,8,9,710]})