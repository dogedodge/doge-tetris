import { DrawableGroup, duang } from '../doge';
import { DefaultUnit } from './DefaultUnit';
import { BlockBitData } from './BlockBitData';
var _super = DrawableGroup();
/**
 * 
 * @param {number} type 0~6
 * @param {number} orientation 0~3
 * @param {number} size
 */
export function TetrisBlock(type, orientation, size) {
    var block = Object.assign(duang(_super), {
        type: type,
        unitSize: size,
        xUnitNum: 5,
        yUnitNum: 5,
        bitData: BlockBitData(type, orientation),
    });

    for (var i = 0; i < block.yUnitNum; i++) {
        for (var j = 0; j < block.xUnitNum; j++) {
            // var index = i * block.xUnitNum + j;
            if (block.bitData[i][j]) {
                var unit = DefaultUnit(block.unitSize);
                unit.x = j * block.unitSize;
                unit.y = i * block.unitSize;
                block.add(unit);
            }
        }
    }

    return block;
}