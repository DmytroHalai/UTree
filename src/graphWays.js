'use strict';

const { powerMatrix } = require('./matrix.js');

const findWays2 = (matrix) => {
  let result = [];
  const sqrMatrix = powerMatrix(matrix, 2);
  const { length } = sqrMatrix;
  for (let start = 0; start < length; start++) {
    for (let end = 0; end < length; end++) {
      const hasVertexWayLength2 = sqrMatrix[start][end] !== 0;
      if (!hasVertexWayLength2) continue;
      const vertexInfo = {
        start,
        end,
      };
      findTempConnectionLength2(vertexInfo, length, matrix, result);
    }
  }
  return result;
};

const findTempConnectionLength2 = (vertexInfo, length, matrix, result) => {
  const { start, end } = vertexInfo;
  for (let tempVertex = 0; tempVertex < length; tempVertex++) {
    const hasStartTempConnection = matrix[start][tempVertex] === 1;
    const hasEndTempConnection = matrix[tempVertex][end] === 1;
    if (!hasStartTempConnection || !hasEndTempConnection) continue;
    if (tempVertex !== end || tempVertex !== start) {
      result.push([start + 1, tempVertex + 1, end + 1]);
    }
  }
};
const findTempConnectionLength3 = (vertexInfo, length, matrix, result) => {
  const { start, end } = vertexInfo;
  for (let k = 0; k < length; k++) {
    const hasStartTempConnection = matrix[start][k] === 1;
    if (hasStartTempConnection) {
      for (let f = 0; f < length; f++) {
        const hasEndTempConnection = matrix[f][end] === 1;
        if (hasEndTempConnection) {
          const hasConnectionBetweenTempVertex = matrix[k][f] === 1;
          const isStitch = k === f;
          if (hasConnectionBetweenTempVertex && !isStitch) {
            result.push([start + 1, k + 1, f + 1, end + 1]);
          }
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
  for (let start = 0; start < length; start++) {
    for (let end = 0; end < length; end++) {
      const hasVertexWayLength3 = cbMatrix[start][end] !== 0;
      if (!hasVertexWayLength3) continue;
      const vertexInfo = { start, end };
      findTempConnectionLength3(vertexInfo, length, matrix, result);
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
