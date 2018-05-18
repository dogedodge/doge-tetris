import { tickerManager } from "./tickerManager";

/**
 * @param {(progress:number)=>void} doTick
 * @param {(ticker:any)=>void} done
 * @param {number} duration 
 * @param {*} [thisArg]
 */
export function TweenTicker(doTick, done, duration, thisArg) {
    var ticker = {
        fromtime: null,
        totime: null,
        /**
         * @param {number} timestamp
         */
        tick: function (timestamp) {
            if (this.fromtime === null) {
                this.fromtime = timestamp;
                this.totime = timestamp + duration;
            }

            if (timestamp >= this.totime) {
                doTick.call(thisArg, 1);
                done.call(thisArg, this);
                // tickerManager.remove(this);
            } else {
                var progress = (timestamp - this.fromtime) * 1.0 / duration;
                doTick.call(thisArg, progress);
            }
        }
    }
    // tickerManager.add(ticker);

    return ticker;
}