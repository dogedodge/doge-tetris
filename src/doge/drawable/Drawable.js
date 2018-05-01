/**
* @typedef {object} IDrawable
* @property {IDrawable} parent
* @property {number} x
* @property {number} y
* @property {number} stageX
* @property {number} stageY
* @property {(ctx:CanvasRenderingContext2D)=>void} draw
*/

/**
 * @returns {IDrawable}
 */
export function Drawable() {
    return {
        parent: null,
        x: 0,
        y: 0,
        stageX: 0,
        stageY: 0,
        draw: function (ctx) {
            if (!this.parent) {
                this.stageX = 0;
                this.stageY = 0;
            } else {
                this.stageX = this.parent.stageX + this.x;
                this.stageY = this.parent.stageY + this.y;
            }
        }
    }
}