"use strict";

const { reachMatrix, findWay, vertexesPower, isRegular, isolVertex, hangVertex } = require('./src');

const matrix = [
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];
const way2 = findWay(matrix, 2);
const way3 = findWay(matrix, 3);
console.table(way2);
console.table(way3);
console.table(vertexesPower(matrix));
console.log(isRegular(matrix));
console.log(isolVertex(matrix));
console.log(hangVertex(matrix));
console.table(reachMatrix(matrix));
