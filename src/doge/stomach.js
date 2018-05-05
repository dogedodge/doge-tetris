import { Group } from "./Group";
import { duang } from "./duang";

var _super = Group();
export var stomach = Object.assign(duang(_super), {
    /**
     * @param {string} src 
     * @returns {PromiseLike<HTMLImageElement>}
     */
    feed: function (src) {
        var promise = new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function (e) {
                reject(e);
            };
            image.src = src;
        });

        return promise;
    }
});