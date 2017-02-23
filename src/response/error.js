module.exports = class {
    constructor(errorObject) {
        this.success = false;
        this.error = errorObject;
        this.message = 'Ouch! Something went horribly wrong. . .'
    }
};