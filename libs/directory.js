module.exports = class directoryClass {
    constructor({ directory, parent }) {
        this.directory = directory;
        this.parent = parent
    }

    dir(dir) {
        let options = {
            directory: dir,
            parent: this
        }
        return new directoryClass(options);
    }

    log(...args) {
        this.parent.log(this, ...args)
    }
}