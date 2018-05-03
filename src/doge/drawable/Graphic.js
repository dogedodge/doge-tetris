import { Drawable } from "./Drawable";
import { duang } from "../duang";

/**
 * 
 * @param {(ctx:CanvasRenderingContext2D)=>void} drawGraph 
 */
export function Graphic(drawGraph) {
    var _super = Drawable();
    return Object.assign(duang(_super), {
        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        draw: function (ctx) {
            _super.draw.call(this, ctx);
            ctx.save();
            ctx.translate(this.stageX, this.stageY);
            this.drawGraph(ctx);
            // ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();

        },
        drawGraph: drawGraph
    });
}