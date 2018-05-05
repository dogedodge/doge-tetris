import { tickerManager } from "./timer";
import { Stage } from "./drawable";
import { stomach } from "./stomach";

/**
 * doge run on a canvas
 * @param {HTMLCanvasElement} canvas 
 */
export function run(canvas) {
    var stage = Stage(canvas);
    if (!tickerManager.running) {
        carry(function () {
            stage.clear();
        });
    }
    carry(function () {
        stage.draw();
    });
    tickerManager.run();
    console.log(tickerManager);
    return stage;
}

/**
 * @typedef {(timestamp:number)=>void} tickFun
 * @typedef {{tick:tickFun}} Ticker
 */
/**
 * doge can carry a ticker
 * @param {tickFun|Ticker} ticker 
 */
export function carry(ticker) {
    if(typeof ticker === 'function'){
        tickerManager.add({
            tick: ticker
        });
    }else if(typeof ticker.tick === 'function'){
        tickerManager.add(ticker);
    }else{
        throw 'Doge only carry tickers';
    }
}

/**
 * feed the doge with images
 * @param {string} src 
 */
export function feed(src){
    return stomach.feed(src);
}