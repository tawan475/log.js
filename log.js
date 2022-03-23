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
        this.logger = this
        return (() => {
            let main = this;
            function logFunction(...args) {
                main.log(...args)
            }
            logFunction.dir = main.dir;
            logFunction._logger = main;
            return logFunction;
        })()
    }

    dir(dir) {
        let dirClass = new directoryClass({
            directory: dir,
            logger: this._logger,
            parent: this._logger.log
        })
        return (() => {
            function logFunction(...args) {
                dirClass.log(...args)
            }
            logFunction.dir = dirClass.dir
            return logFunction;
        })()
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
        if (dir.length) dir.push(":");

        let logArr = [];
        // add log prefix
        let prefix = this.logger.option.prefix
        prefix = prefix.replace(/\$DATE/g, Date.now());
        logArr.push(prefix);
        if (dir.length) logArr.push(dir.join(""));
        logArr.push(...logs)

        if (this.logger.option.consoleLog) console.log(...logArr);
        if (this.logger.option.logToFile) this.logger.saveLog(...logArr);
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