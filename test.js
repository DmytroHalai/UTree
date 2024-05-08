'use strict';

const {
  createDirMatrix,
  powerMatrix,
  convertMatrixToString,
} = require('./src/matrix');

const matrix2 = [
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
];

const matrix = createDirMatrix(10);
console.table(matrix);
console.table(powerMatrix(matrix2, 3));
console.table(convertMatrixToString(matrix2));
//const way2 = findWay(matrix, 2);
//const way3 = findWay(matrix, 3);
// console.table(way2);
// console.table(way3);
// console.table(vertexesPower(matrix));
//console.log(isRegular(matrix));
//console.log(isolVertex(matrix));
//console.log(hangVertex(matrix));
// console.table(reachMatrix(matrix));
