'use strict';

const createDirMatrix = (count) => {
  let matrix = Array.from({ length: count }, () => Array(count).fill(0));
  return matrix.map((value) => value.map(() => Math.floor(Math.random() * 2)));
};

const undirMatrix = (matrix) => {
  const { length } = matrix;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (matrix[i][j] === 1) {
        matrix[j][i] = 1;
      }
    }
  }

  return matrix;
};

const multMatrix = (matrix1, matrix2) => {
  const { length } = matrix1;
  let result = Array.from({ length }, () => new Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let res = 0;
      for (let k = 0; k < length; k++) {
        const firstMatrixElement = matrix1[i][k];
        const secondMatrixElement = matrix2[k][j];
        res += firstMatrixElement * secondMatrixElement;
      }
      result[i][j] = res;
    }
  }
  return result;
};

const identityMatrix = (num) => {
  let matrix = Array.from({ length: num }, () => Array(num).fill(0));
  for (let i = 0; i < num; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
};

const powerMatrix = (matrix, num) => {
  let temp = [];
  if (num === 0) return identityMatrix(matrix.length);
  if (num === 1) return matrix;
  num--;
  temp = powerMatrix(matrix, num);
  return multMatrix(matrix, temp);
};

/**
 * This method finds reach matrix for your graph
 * @param matrix Adjacency matrix
 * @returns {any[][]} Reach matrix
 */
const reachMatrix = (matrix) => {
  const { length } = matrix;
  const matrixObject = {
    1: matrix,
  };
  for (let i = 2; i <= length - 1; i++) {
    const num = i - 1;
    matrixObject[`${i}`] = multMatrix(matrix, matrixObject[`${num}`]);
  }
  const result = Array.from({ length }, () => new Array(length));
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      let val = false;
      for (let key in matrixObject) {
        const tempMatrix = matrixObject[key];
        val = tempMatrix[row][col] !== 0;
        if (val) break;
      }
      result[row][col] = val || row === col ? 1 : 0;
    }
  }
  return result;
};

const transMatrix = (matrix) => {
  const { length } = matrix;
  let result = Array.from({ length }, () => Array(length).fill(0));
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      result[row][col] = matrix[col][row];
    }
  }
  return result;
};
/**
 * This method finds a strong connectivity matrix for your graph
 * @param matrix Adjacency matrix
 * @returns {any[][]} Strong connectivity matrix
 */
const strongMatrix = (matrix) => {
  const { length } = matrix;
  const reach = reachMatrix(matrix);
  const trans = transMatrix(reach);
  const result = Array.from({ length }, () => new Array(length));
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      result[row][col] = trans[row][col] * reach[row][col];
    }
  }
  return result;
};

const convertMatrixToString = (matrix) => {
  return matrix.map((row, i) => (row[i] = row.join('')));
};

module.exports = {
  createDirMatrix,
  convertMatrixToString,
  multMatrix,
  reachMatrix,
  strongMatrix,
  undirMatrix,
  transMatrix,
  powerMatrix,
};
