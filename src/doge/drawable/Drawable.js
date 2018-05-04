export function Drawable() {
    return {
        parent: null,
        x: 0,
        y: 0,
        stageX: 0,
        stageY: 0,
        rotation: 0,
        anchorX: 0,
        anchorY: 0,
        /** @param {CanvasRenderingContext2D} ctx */
        draw: function (ctx) {
            if (!this.parent) {
                // only stage has no parent
                this.stageX = 0;
                this.stageY = 0;
            } else {
                this.stageX = this.parent.stageX + this.x;
                this.stageY = this.parent.stageY + this.y;
            }
            ctx.save();
            ctx.translate(this.stageX + this.anchorX, this.stageY + this.anchorY);
            if (this.rotation % 360 !== 0) {
                ctx.rotate(this.rotation * Math.PI / 180);
            }
            ctx.translate(-this.anchorX, -this.anchorY);
            this.onDraw(ctx);
            ctx.restore();
        },

        /** @param {CanvasRenderingContext2D} ctx */
        onDraw: function (ctx) {

        }
    }
}