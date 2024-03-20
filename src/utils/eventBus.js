class Bus {
    constructor() {
        this.callbackList = {}
    }

    $on(name, callback) {
        this.callbackList[name] ? this.callbackList[name].push(callback) : (this.callbackList[name] = [callback])
    }

    $emit(name, args) {
        if(this.callbackList[name]) {
            this.callbackList[name].forEach(cb => cb(args))
        }
    }
}

export default new Bus();