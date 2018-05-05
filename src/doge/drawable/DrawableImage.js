import { Drawable } from ".";
import { duang } from "../duang";
import { stomach } from "../stomach";

/**
 * Image can be drew by doge
 * @param {string} src 
 */
export function DrawableImage(src) {
    var _super = Drawable();
    return Object.assign(duang(_super), {
        /** @type {PromiseLike<HTMLImageElement>} */
        promise: null,
        /** @type {HTMLImageElement} */
        image: null,
        /** @param {CanvasRenderingContext2D} ctx */
        draw: function (ctx) {
            if (this.image !== null) {
                _super.draw.call(this, ctx);
                return;
            }

            if (this.promise === null) {
                this.promise = stomach.feed(src);
                var that = this;
                this.promise.then(function (img) {
                    that.width = img.width;
                    that.height = img.height;
                    that.image = img;
                    _super.draw.call(that, ctx);
                });
            }
        },

        /** @param {CanvasRenderingContext2D} ctx */
        onDraw: function (ctx) {
            ctx.drawImage(this.image, 0, 0);
        }
    });
}