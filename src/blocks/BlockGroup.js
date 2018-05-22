import { DrawableGroup } from "../doge";
import { DefaultUnit } from './DefaultUnit';

/**
 * 
 * @param {number} xUnitNum 
 * @param {number} yUnitNum 
 * @param {number} uSize 
 */
export function BlockGroup(xUnitNum, yUnitNum, uSize) {
    var _super = DrawableGroup();

    var self = Object.assign(_super, {
        uSize: uSize,
        xUnitNum: xUnitNum,
        yUnitNum: yUnitNum,
        /**
         * @type {number[][]}
         */
        bitData: null,

        refreshBlocks: function () {
            if (this.bitData === null) {
                console.warn('Need set bitData first!');
            }
            this.removeAll();
            for (var i = 0; i < this.yUnitNum; i++) {
                for (var j = 0; j < this.xUnitNum; j++) {
                    if (this.bitData[i][j]) {
                        var unit = DefaultUnit(this.uSize);
                        unit.x = j * this.uSize;
                        unit.y = i * this.uSize;
                        this.add(unit);
                    }
                }
            }
        }
    });

    return self;
}