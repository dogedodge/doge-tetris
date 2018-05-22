import { duang } from '../doge';
import { DefaultUnit } from './DefaultUnit';
import { BlockBitData } from './BlockBitData';
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
    });

    self.refreshBlocks();

    return self;
}