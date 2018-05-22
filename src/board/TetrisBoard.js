import { BlockGroup } from "../blocks/BlockGroup";
import { tween } from "../doge";

/**
 * @typedef {object} Block
 * @prop {number} unitX
 * @prop {number} unitY
 * @prop {number[][]} bitData
 * @prop {number} xUnitNum
 * @prop {number} yUnitNum
 * @prop {()=>void} rotate
 */

export function TetrisBoard(xUnitNum, yUnitNum, uSize) {
    var _super = BlockGroup(xUnitNum, yUnitNum, uSize);

    var self = Object.assign(_super, {
        bitData: getEmptyData(),

        /**
         * @type {Block}
         */
        targetBlock: null,

        /**
         * @param {Block} block
         */
        bornBlock: function (block) {
            block.unitX = 2;
            block.unitY = 0;
            this.targetBlock = block;
            block = Object.assign(block, this.tagetCoordinate());
            self.add.call(this, block);
            // this.updateBitData();
        },

        moveLeft: function () {
            this.targetBlock.unitX--;
            if (this.checkCollision() >=0) {
                // undo
                this.targetBlock.unitX++;
            } else {
                this.doAfterMove();
            }
        },

        moveRight: function () {
            this.targetBlock.unitX++;
            if (this.checkCollision() >=0) {
                // undo
                this.targetBlock.unitX--;
            } else {
                this.doAfterMove();
            }
        },

        fallDown: function () {

        },

        rotateBlock: function () {
            this.targetBlock.rotate();

            switch(this.checkCollision()){
                case CollisionType.LEFT:
                    this.targetBlock.unitX ++;
                    break;
            }
            // this.updateBitData();
        },

        doAfterMove: function () {
            // this.updateBitData();
            tween(this.targetBlock).to(this.tagetCoordinate(), 200);
        },

        updateBitData: function () {
            var data = this.bitData;
            var block = this.targetBlock;
            for (var i = 0; i < block.yUnitNum; i++) {
                for (var j = 0; j < block.xUnitNum; j++) {
                    var bit = block.bitData[i][j];
                    if (bit > 0) {
                        data[block.unitY + i][block.unitX + j] = bit;
                    }
                }
            }
            // self.refreshBlocks.call(this);
        },


        checkCollision: function () {
            // var hasCollision = false;
            var block = this.targetBlock;
            var i, j, bit, unitX, unitY;
            for (i = 0; i < block.yUnitNum; i++) {
                for (j = 0; j < block.xUnitNum; j++) {
                    bit = block.bitData[i][j];
                    if (bit > 0) {
                        unitX = block.unitX + j;
                        unitY = block.unitY + i;
                        if (unitX < 0) {
                            return CollisionType.LEFT;
                        } else if (unitX >= this.xUnitNum) {
                            return CollisionType.RIGHT;
                        }
                        else if (unitY >= this.yUnitNum) {
                            return CollisionType.BOTTOM;
                        } else if (this.bitData[unitY] && this.bitData[unitY][unitX] > 0) {
                            // fall down onto other block in bottom
                            return CollisionType.BOTTOM;
                        }
                    }
                }
                // if(hasCollision){
                //     break;
                // }
            }
            return CollisionType.NONE;
        },

        absorbBlock: function () {

        },

        tagetCoordinate: function () {
            return {
                x: this.targetBlock.unitX * uSize,
                y: this.targetBlock.unitY * uSize
            }
        }
    });

    // self.refreshBlocks();

    /**
    * @returns {number[][]}
    */
    function getEmptyData() {
        var bitData = [];
        for (var i = 0; i < yUnitNum; i++) {
            var row = [];
            for (var j = 0; j < xUnitNum; j++) {
                row.push(0);
            }
            bitData.push(row);
        }
        return bitData;
    }

    return self;
}

var CollisionType = {
    NONE: -1,
    BOTTOM: 0,
    LEFT: 1,
    RIGHT: 2
}