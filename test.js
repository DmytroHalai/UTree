"use strict";

const { createDirMatrix, powerMatrix, convertMatrixToString } = require('./src/utility/matrix');

// const matrix2 = [
//   [1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
//   [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
//   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
// ];

const matrix = createDirMatrix(10);
console.table(powerMatrix(matrix, 3));
console.table(convertMatrixToString(matrix));
//const way2 = findWay(matrix, 2);
//const way3 = findWay(matrix, 3);
// console.table(way2);
// console.table(way3);
// console.table(vertexesPower(matrix));
//console.log(isRegular(matrix));
//console.log(isolVertex(matrix));
//console.log(hangVertex(matrix));
// console.table(reachMatrix(matrix));
