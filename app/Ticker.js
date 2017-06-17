
class Ticker {
    constructor(interval = 5 * 60 * 60000) {
        let self = this;
        setInterval(() => {
            self.trigger('tick', new Date());
        }, interval);
    }
}

module.exports = Ticker;
