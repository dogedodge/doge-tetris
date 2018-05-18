import { duang } from '../duang';
import { Group } from "../Group";

var _super = Group();
export var tickerManager = Object.assign(duang(_super), {
    running: false,
    add: function (child) {
        if (typeof child.tick === 'function') {
            _super.add.call(this, child);
        } else {
            throw 'only tickers can be added'
        }
    },
    run: function () {
        if (!this.running) {
            window.requestAnimationFrame(tick);
        }
        this.running = true;
    }
});

function tick(timestamp) {
    tickerManager.forEach(function (ticker) {
        ticker.tick(timestamp);
    });
    window.requestAnimationFrame(tick);
}