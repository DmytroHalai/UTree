"use strict";

const { cubeMatrix, squareMatrix } = require("./matrix.js");

const findWays2 = (matrix) => {
  let result = [];
  const sqrMatrix = squareMatrix(matrix);
  const count = sqrMatrix[0].length;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (sqrMatrix[i][j] === 0) continue;
      for (let k = 0; k < count; k++) {
        if (matrix[k][j] === 1 && matrix[i][k] === 1 && (k !== j || k !== i)) {
          result.push([i + 1, k + 1, j + 1]);
        }
      }
    }
  }
  return result;
};

const findWays3 = (matrix) => {
  let result = [];
  const cbMatrix = cubeMatrix(matrix);
  const count = cbMatrix[0].length;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (cbMatrix[i][j] === 0) continue;
      for (let k = 0; k < count; k++) {
        if (matrix[i][k] === 1) {
          for (let f = 0; f < count; f++) {
            if (matrix[f][j] === 1) {
              if (matrix[k][f] === 1 && k !== f) {
                result.push([i + 1, k + 1, f + 1, j + 1]);
              }
            }
          }
        }
      }
    }
  }
  return result;
};

/**
 * This method finds ways in the graph
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @param {number} power Equals 2 to find ways length 2 or 3 to find ways length 3
 * @returns {[]} array of the whole ways of the chosen length
 */
const findWay = (matrix, power) => {
  const collection = new Map();
  collection.set(2, findWays2(matrix));
  collection.set(3, findWays3(matrix));

  return collection.get(power);
}

module.exports = { findWay };
