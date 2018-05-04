import { Drawable } from "./Drawable";
import { duang } from "../duang";

/**
 * 
 * @param {(ctx:CanvasRenderingContext2D)=>void} drawGraph 
 */
export function Graphic(drawGraph) {
    var _super = Drawable();
    return Object.assign(duang(_super), {
        onDraw: drawGraph
    });
}