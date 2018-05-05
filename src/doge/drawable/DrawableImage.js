import { Drawable } from ".";
import { duang } from "../duang";
import { stomach } from "../stomach";

/**
 * Image can be drew by doge
 * @param {string} src 
 * @param {number} [width]
 * @param {number} [height]
 */
export function DrawableImage(src, width, height) {
    var _super = Drawable(width, height);
    return Object.assign(duang(_super), {
        /** @type {PromiseLike<HTMLImageElement>} */
        promise: null,
        /** @type {HTMLImageElement} */
        image: null,
        imgScaleX: 1,
        imgScaleY: 1,
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
                    that.image = img;
                    that.updateSize.call(that);
                    _super.draw.call(that, ctx);
                });
            }
        },

        updateSize: function () {
            if (this.width === void 0) {
                this.width = this.image.width;
            }
            if (this.height === void 0) {
                this.height = this.image.height;
            }

            // if already has size before img loaded, should scale to fit
            this.imgScaleX = this._width / this.image.width;
            this.imgScaleY = this._height / this.image.height;
        },

        /** @param {CanvasRenderingContext2D} ctx */
        onDraw: function (ctx) {
            _super.onDraw.call(this, ctx);
            var shouldScale = (this.imgScaleX !== 1 || this.imgScaleY !== 1);
            if (shouldScale) {
                ctx.save();
                ctx.scale(this.imgScaleX, this.imgScaleY);
            }
            ctx.drawImage(this.image, 0, 0);
            if (shouldScale) {
                ctx.restore();
            }
        }
    });
}