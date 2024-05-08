'use strict';

const { powerMatrix } = require('./matrix.js');

const findWays2 = (matrix) => {
  let result = [];
  const sqrMatrix = powerMatrix(matrix, 2);
  const { length } = sqrMatrix;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (!sqrMatrix[i][j]) continue;
      for (let k = 0; k < length; k++) {
        if (matrix[k][j] && matrix[i][k] && (k !== j || k !== i)) {
          result.push([i + 1, k + 1, j + 1]);
        }
      }
    }
  }
  return result;
};

const findWays3 = (matrix) => {
  let result = [];
  const cbMatrix = powerMatrix(matrix, 3);
  const { length } = cbMatrix;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (!cbMatrix[i][j]) continue;
      for (let k = 0; k < length; k++) {
        if (matrix[i][k]) {
          for (let f = 0; f < length; f++) {
            if (matrix[f][j]) {
              if (matrix[k][f] && k !== f) {
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
};

module.exports = { findWay };
