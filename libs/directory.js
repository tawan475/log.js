module.exports = class directoryClass {
    constructor({ directory, logger, parent }) {
        this.directory = directory;
        this.logger = logger
        this.parent = parent
    }

    dir(dir) {
        let dirClass = new directoryClass({
            directory: dir,
            logger: this.logger,
            parent: this
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
        this.parent(this, ...args)
    }
}