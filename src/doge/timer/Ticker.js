import { tickerManager } from "./tickerManager";

/**
 * @param {(ticker:any)=>void} callback
 * @param {number} duration 
 * @param {*} [thisArg]
 */
export function Ticker(callback, duration, thisArg) {
    var ticker = {
        fromtime: null,
        totime: null,
        /**
         * @param {number} timestamp
         */
        tick: function (timestamp) {
            if (this.fromtime === null) {
                this.fromTime = timestamp;
                this.toTime = timestamp + duration;
            }

            if (timestamp >= this.totime) {
                this.done()
                tickerManager.remove(this);
            }
        },

        done: function () {
            callback.call(thisArg, this);
        }
    }
    tickerManager.add(ticker);
    return ticker;
}