import { BlockGroup } from "../blocks/BlockGroup";


export function TetrisBoard(xUnitNum, yUnitNum, uSize) {
    var _super = BlockGroup(xUnitNum, yUnitNum, uSize);

    var self = Object.assign(_super, {
        bitData: getEmptyData()
    });
    self.refreshBlocks();

    /**
    * @returns {number[][]}
    */
    function getEmptyData() {
        var bitData = [];
        for (var i = 0; i < yUnitNum; i++) {
            var row = [];
            for (var j = 0; j < xUnitNum; j++) {
                row.push(1);
            }
            bitData.push(row);
        }
        return bitData;
    }

    return self;
}

