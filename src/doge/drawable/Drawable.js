export function Drawable() {
    var _width = 0;
    var _height = 0;

    var _this = {
        /** @type {{stageX:number, stageY:}} */
        parent: null,
        x: 0,
        y: 0,
        stageX: 0,
        stageY: 0,
        rotation: 0,
        anchorX: 0,
        anchorY: 0,
        scaleX: 1,
        scaleY: 1,
        width: 0,
        height: 0,
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
            // todo: use transform instead
            ctx.translate(this.stageX, this.stageY);
            if (this.rotation % 360 !== 0) {
                ctx.rotate(this.rotation * Math.PI / 180);
            }
            ctx.translate(-this.anchorX * this.scaleX, -this.anchorY * this.scaleY);
            ctx.scale(this.scaleX, this.scaleY);

            this.onDraw(ctx);

            ctx.restore();
        },
        /**
         * @param {number} scaleX
         * @param {number} [scaleY]
         */
        scale: function (scaleX, scaleY) {
            if (scaleX === void 0) {
                this.scaleX = 1;
            } else {
                this.scaleX = scaleX;
            }
            if (scaleY === void 0) {
                this.scaleY = this.scaleX;
            } else {
                this.scaleY = scaleY
            }
        },

        /**
         * callback to override
         * @param {CanvasRenderingContext2D} ctx
         */
        onDraw: function (ctx) {

        }
    }

    Object.defineProperty(_this, 'width', {
        get: function () {
            return _width * this.scaleX;
        },
        set: function (w) {
            _width = w;
        }
    });

    Object.defineProperty(_this, 'height', {
        get: function () {
            return _height * this.scaleY;
        },
        set: function (h) {
            _height = h;
        }
    });

    return _this;
}