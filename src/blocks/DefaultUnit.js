import { Graphic } from "../doge";


/**
 * 
 * @param {number} size 
 */
export function DefaultUnit(size) {
    var unit = Graphic(function (ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, size, size);
        ctx.rect(size * 0.25, size * 0.25, size * 0.5, size * 0.5);
        ctx.stroke();
    });
    unit.width = size;
    unit.height = size;
    return unit;
}