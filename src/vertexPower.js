'use strict';

const findUndirMatrixPower = (matrix) => {
  const { length } = matrix;
  const result = [];
  for (let i = 0; i < length; i++) {
    let counter = 0;
    for (let j = 0; j < length; j++) {
      if (matrix[i][j]) {
        if (i === j) counter++;
        counter++;
      }
    }
    result.push(counter);
  }
  return result;
};

const findDirMatrixPower = (matrix) => {
  const { length } = matrix;
  const result = [];
  for (let i = 0; i < length; i++) {
    let counter = 0;
    for (let j = 0; j < length; j++) {
      if (matrix[i][j] || matrix[j][i]) {
        if (i === j) counter++;
        counter++;
      }
    }
    result.push(counter);
  }
  return result;
};

const findDirMatrixEnterPower = (matrix) => {
  const { length } = matrix;
  const result = [];
  for (let i = 0; i < length; i++) {
    let counter = 0;
    for (let j = 0; j < length; j++) {
      if (matrix[j][i]) {
        counter++;
      }
    }
    result.push(counter);
  }
  return result;
};

const findDirMatrixExitPower = (matrix) => {
  const { length } = matrix;
  const result = [];
  for (let i = 0; i < length; i++) {
    let counter = 0;
    for (let j = 0; j < length; j++) {
      if (matrix[i][j]) {
        counter++;
      }
    }
    result.push(counter);
  }
  return result;
};

/**
 *This method finds powers of vertexes.
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @returns {{dir: [], undir: [], dirEnter: [], dirExit: [], }} an object
 * which fields are arrays of powers for each vertex.
 */
const vertexesPower = (matrix) => {
  return {
    dir: findDirMatrixPower(matrix),
    undir: findUndirMatrixPower(matrix),
    dirEnter: findDirMatrixEnterPower(matrix),
    dirExit: findDirMatrixExitPower(matrix),
  };
};

module.exports = {
  vertexesPower,
  findDirMatrixPower,
  findUndirMatrixPower,
  findDirMatrixEnterPower,
  findDirMatrixExitPower,
};
