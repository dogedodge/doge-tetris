/**
 * 
 * @param {number} type 0~6
 * @param {number} orientation 0~3
 */
export function BlockBitData(type, orientation) {
    var typeBundle = allData[type];
    return typeBundle[orientation % typeBundle.length];
}

var protoBitData = [
    // type 0
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 1
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 2
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 3
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 4
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 5
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
    // type 6
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
];

var allData = [[], [], [], [], [], [], []];
allData[0] = [protoBitData[0]];
setupOrientForType(1, 4);
setupOrientForType(2, 4);
setupOrientForType(3, 2);
setupOrientForType(4, 4);
setupOrientForType(5, 4);
setupOrientForType(6, 4);

function setupOrientForType(type, orientNum) {
    allData[type] = [protoBitData[type]];
    for (var i = 0; i < orientNum - 1; i++) {
        allData[type].push(rotate(allData[type][i]));
    }
}


/**
 * rotate a matrix
 * @param {number[][]} m 
 */
function rotate(m) {
    var n = [
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0]
    ];
    return multiply(transpose(m), n);
}

/**
 * transpose a matrix
 * @param {number[][]} m 
 * @returns {number[][]}
 */
function transpose(m) {
    return m[0].map(function (col, i) {
        return m.map(function (row) {
            return row[i];
        })
    });
}

/**
 * multiply two matrix
 * @param {number[][]} a 
 * @param {number[][]} b 
 * @returns {number[][]}
 */
function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}