"use strict";

const { findDirMatrixPower } = require("./vertexPower.js");

/**
 * This method checks if the graph is regular.
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @returns {boolean} true if graph is regular and false if not
 */
const isRegular = (matrix) => {
  const powerDir = findDirMatrixPower(matrix);
  const val = powerDir[0];
  for (const item of powerDir) {
    if (val !== item) {
      return false;
    }
  }
  return true;
};


module.exports = { isRegular };