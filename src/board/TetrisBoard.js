import { BlockGroup } from "../blocks/BlockGroup";
import { TetrisBlock } from "../blocks/TetrisBlock";
import { tween } from "../doge";
import { randomInt } from "../math";

/**
 * @typedef {object} Block
 * @prop {number} unitX
 * @prop {number} unitY
 * @prop {number[][]} bitData
 * @prop {number} xUnitNum
 * @prop {number} yUnitNum
 * @prop {()=>void} rotate
 * @prop {()=>void} reverse
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
            if (this.checkCollision() > 0) {
                // undo
                this.targetBlock.unitX++;
            } else {
                this.doAfterMove();
            }
        },

        moveRight: function () {
            this.targetBlock.unitX++;
            if (this.checkCollision() > 0) {
                // undo
                this.targetBlock.unitX--;
            } else {
                this.doAfterMove();
            }
        },

        fallDown: function () {
            this.targetBlock.unitY++;
            var cType = this.checkCollision();
            if (cType === 0) {
                this.targetBlock.unitY--;
                console.log('Game End!');
            } else if (cType > 0) {
                this.targetBlock.unitY--;
                this.absorbBlock();
                this.bornBlock(TetrisBlock(randomInt(0, 7), randomInt(0, 3), 48));
            } else {
                this.doAfterMove();
            }
        },

        rotateBlock: function () {
            this.targetBlock.rotate();
            var collisionType = this.checkCollision();
            do {
                switch (collisionType) {
                    case CollisionType.LEFT:
                        this.targetBlock.unitX++;
                        break;
                    case CollisionType.RIGHT:
                        this.targetBlock.unitX--;
                        break;
                    case CollisionType.BOTTOM:
                        this.targetBlock.reverse();
                        break;
                }
                collisionType = this.checkCollision();
            } while (collisionType !== CollisionType.NONE)

            this.doAfterMove();
            // this.updateBitData();
        },

        doAfterMove: function () {
            // this.updateBitData();
            tween(this.targetBlock).to(this.tagetCoordinate(), 200);
        },

        updateBitData: function () {

            // self.refreshBlocks.call(this);
        },


        checkCollision: function () {
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
                        } else if (unitY < 0) {
                            return CollisionType.TOP;
                        } else if (unitY >= this.yUnitNum) {
                            return CollisionType.BOTTOM;
                        } else if (this.bitData[unitY] && this.bitData[unitY][unitX] > 0) {
                            // fall down onto other block in bottom
                            return CollisionType.BOTTOM;
                        }
                    }
                }
            }
            return CollisionType.NONE;
        },

        absorbBlock: function () {
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
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
}