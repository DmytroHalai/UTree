"use strict";

const { findDirMatrixPower } = require("./vertexPower.js");


const isolAndHangingVertexes = (matrix) => {
  const powerArr = findDirMatrixPower(matrix);
  const { length } = powerArr;
  let result = {
    isolResult: [],
    hangResult: [],
  };
  for (let i = 0; i < length; i++) {
      if (powerArr[i] === 1) {
        result.hangResult.push(i + 1);
      } else if (!powerArr[i]) {
        result.isolResult.push(i + 1);
      }
  }
  return result;
};

/**
 * This method finds hanged vertexes in the graph
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @returns {[]} array of hanged vertexes
 */
const hangVertex = (matrix) => {
  return isolAndHangingVertexes(matrix).hangResult;
};

/**
 * This method finds isolated vertexes in the graph
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @returns {[]} array of isolated vertexes
 */
const isolVertex = (matrix) => {
  return isolAndHangingVertexes(matrix).isolResult;
};


module.exports = { hangVertex, isolVertex };