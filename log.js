const directoryClass = require('./libs/directory.js')
const fs = require('fs');

module.exports = class logger {
    constructor({ consoleLog = true, logToFile = false, LogFile = 'log.txt', prefix }) {
        this.option = {
            consoleLog: consoleLog || true,
            logToFile: logToFile || false,
            LogFile: LogFile || "./log.log",
            prefix: prefix || "[$DATE]"
        }
    }

    dir(dir) {
        return new directoryClass({
            directory: dir,
            parent: this
        });
    }

    log(...args) {
        let dir = []
        let logs = [];
        for (let arg of args) {
            if (arg instanceof directoryClass) {
                dir.push(arg.directory);
            } else {
                logs.push(arg);
            }
        }

        let logArr = [];
        // add log prefix
        let prefix = this.option.prefix
        prefix = prefix.replace(/\$DATE/g, Date.now());
        logArr.push(prefix);
        logArr.push(dir.join("") + ":");
        logArr.push(...logs)

        if (this.option.consoleLog) console.log(...logArr);
        if (this.option.logToFile) this.saveLog(...logArr);
        return logArr;
    }

    saveLog(...logs) {
        let logString = logs.map((arg) => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg);
            }
            return arg.toString().replace(/\r?\n/g, "\r\n")
        }).join(" ")

        logString += "\r\n";
        fs.appendFileSync(this.option.LogFile, logString);
    }
}