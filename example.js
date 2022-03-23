const Logger = require("./log.js");
const logger = new Logger({
    consoleLog: true,
    logToFile: true,
    LogFile: "./log.log"
})


let base = logger;
base("Hello World from root!"); 
let log = logger.dir("/").dir("home/").dir("user/");
log("Hello World!", 1, {obj: 123, arr: [1,2,3,4,5,6,7,8,9,710]})

logger.dir("dir1/").dir("dir2/").dir("file.name")("log1", "log2", "log3");