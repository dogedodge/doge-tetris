import { TweenTicker } from "./timer/TweenTicker";
import { tickerManager } from "./timer";

/**
 * @typedef {object} DrawableState
 * @prop {number} x
 * @prop {number} y
 * @prop {number} rotation
 * @prop {number} scaleX
 * @prop {number} scaleY
 * @prop {number} width
 * @prop {number} height
*/

/**
 * @param {DrawableState} drawalbe
 */
export function tween(drawalbe) {
    var fromState = {};
    for (var key in drawalbe) {
        var value = drawalbe[key];
        if (typeof value === 'number') {
            fromState[key] = drawalbe[key];
        }
    }

    var deltaState = {};

    return {
        /** 
         * @param {DrawableState} targetState
         * @param {number} duration
         * @returns {Promise<DrawableState>}
        */
        to: function (targetState, duration) {
            for (var key in targetState) {
                deltaState[key] = targetState[key] - fromState[key];
            }
            return new Promise(function (resolve, reject) {
                var ticker = TweenTicker(function (progress) {
                    // console.log('fromState', fromState);
                    // console.log('deltaState', deltaState);
                    // console.log(progress);
                    for (var key in deltaState) {
                        drawalbe[key] = fromState[key] + deltaState[key] * progress;
                        // console.log(key, drawalbe[key]);
                    }
                }, function () {
                    tickerManager.remove(ticker);
                    resolve(drawalbe);
                }, duration);
                // console.log('ticker', ticker);
                tickerManager.add(ticker);
            });
        }
    }
}