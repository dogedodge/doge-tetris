import { Group } from "./Group";
import { duang } from "./duang";

export var stomach = {
    map: {},
    /**
     * @param {string} src 
     * @returns {PromiseLike<HTMLImageElement>}
     */
    feed: function (src) {
        var promise = this.map[src];
        // load for the src before
        if (promise) {
            return promise;
        }

        promise = new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function (e) {
                reject(e);
            };
            image.src = src;
        });
        this.map[src] = promise;
        return promise;
    }
};