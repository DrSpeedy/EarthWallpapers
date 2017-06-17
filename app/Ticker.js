
class Ticker {
    constructor(interval = 1000) {
        let self = this;
        setInterval(() => {
            self.trigger('tick', new Date());
        }, interval);
    }
}

module.exports = Ticker;
