'use strict';

const findUndirMatrixPower = (matrix) => {
  const { length } = matrix;
  const result = [];
  for (let row = 0; row < length; row++) {
    let counter = 0;
    for (let col = 0; col < length; col++) {
      const hasConnect = matrix[row][col] === 1;
      const isStitch = col === row;
      if (hasConnect) {
        if (isStitch) counter++;
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
  for (let row = 0; row < length; row++) {
    let counter = 0;
    for (let col = 0; col < length; col++) {
      const hasConnect = matrix[row][col] === 1 || matrix[col][row] === 1;
      const isStitch = col === row;
      if (hasConnect) {
        if (isStitch) counter++;
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
  for (let row = 0; row < length; row++) {
    let counter = 0;
    for (let col = 0; col < length; col++) {
      const hasConnect = matrix[col][row] === 1;
      if (hasConnect) {
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
  for (let row = 0; row < length; row++) {
    let counter = 0;
    for (let col = 0; col < length; col++) {
      const hasConnect = matrix[row][col] === 1;
      if (hasConnect) {
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
};
