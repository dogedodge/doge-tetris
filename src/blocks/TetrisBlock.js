import { duang } from '../doge';
import { DefaultUnit } from './DefaultUnit';
import { BlockBitData, rotateMatrix } from './BlockBitData';
import { BlockGroup } from './BlockGroup';

/**
 * 
 * @param {number} type 0~6
 * @param {number} orientation 0~3
 * @param {number} uSize
 */
export function TetrisBlock(type, orientation, uSize) {
    var _super = BlockGroup(5, 5, uSize);
    var self = Object.assign(_super, {
        type: type,
        orientation: orientation,
        bitData: BlockBitData(type, orientation),
        rotate: function () {
            this.orientation++;
            this.bitData = BlockBitData(this.type, this.orientation);
            self.refreshBlocks.call(this);
        },
        reverse: function () {
            this.orientation--;
            this.bitData = BlockBitData(this.type, this.orientation);
            self.refreshBlocks.call(this);
        }
    });

    self.refreshBlocks();

    return self;
}