import { BlockGroup } from "../blocks/BlockGroup";
import { tween } from "../doge";


/**
 * @typedef {object} Block
 * @prop {number} unitX
 * @prop {number} unitY
 * @prop {number[][]} bitData
 * @prop {number} xUnitNum
 * @prop {number} yUnitNum
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
            this.updateBitData();
        },

        moveLeft: function () {
            var block = this.targetBlock;
            block.unitX--;
            var that = this;
            tween(block).to(this.tagetCoordinate(), 1000).then(function(){
                that.updateBitData();
            });
        },

        moveRight: function () {
            var block = this.targetBlock;
            block.unitX++;
            var that = this;
            tween(block).to(this.tagetCoordinate(), 1000).then(function(){
                that.updateBitData();
            });
        },

        updateBitData: function () {
            var data = this.bitData;
            var block = this.targetBlock;
            for (var i = 0; i < block.yUnitNum; i++) {
                for (var j = 0; j < block.xUnitNum; j++) {
                    data[block.unitY + i][block.unitX + j] = block.bitData[i][j];
                }
            }
            // self.refreshBlocks.call(this);
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

