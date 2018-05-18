import { duang } from '../duang'
import { DrawableGroup } from '../drawable';

/**
 * @param {HTMLCanvasElement} canvas 
 */
export function Stage(canvas) {
    var ctx = canvas.getContext('2d');
    var _super = DrawableGroup();
    var _this = Object.assign(duang(_super), {
        draw: function () {
            _super.draw(ctx);
        },
        clear: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
    _this.width = canvas.width;
    _this.height = canvas.height;
    return _this;
}