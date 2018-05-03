import { duang } from '../duang'
import { DrawableGroup } from '../drawable';

/**
 * @param {HTMLCanvasElement} canvas 
 */
export function Stage(canvas) {
    var ctx = canvas.getContext('2d');
    var _super = DrawableGroup();
    return Object.assign(duang(_super), {
        draw: function () {
            _super.draw(ctx);
        },
        clear: function () {
            // console.log(canvas.width, canvas.height, ctx);
            // ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.width);
        }
    });
}