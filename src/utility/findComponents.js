"use strict";

const { convertMatrixToString, reachMatrix, strongMatrix } = require("./matrix.js");

/**
 * This method finds components of the graph
 * @param {[[]]} matrix Adjacency matrix of the graph
 * @returns {Object} The object, which consists of the arrays
 */
const findComponents = (matrix) => {
  const result = {};
  const valueToIndexMap = {};
  let indexCounter = 1;
  const strongMatrixConverted = convertMatrixToString(
    strongMatrix(reachMatrix(matrix)),
  );

  Object.entries(strongMatrixConverted).forEach(([key, value]) => {
    if (!valueToIndexMap[value]) {
      valueToIndexMap[value] = indexCounter;
      result[indexCounter] = [key];
      indexCounter++;
    } else {
      result[valueToIndexMap[value]].push(key);
    }
  });

  return result;
};


module.exports = { findComponents };