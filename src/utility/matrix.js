"use strict";

const { pseudoRandom } =  require("./utils.js");

const createDirMatrix = (count) => {
  const generator = pseudoRandom(count);
  let matrix = Array.from({ length: count },
    () => Array(count).fill(0));
  return matrix.map((value) => value.map(
    () => Math.floor(generator() * 1)
  ));
};

const undirMatrix = (matrix) => {
  return matrix.map((value, i) => value.map((value1, j) => matrix[j][i] ? 1 : 0));
};

const multMatrix = (matrix1, matrix2) => {
  const { length } = matrix1;
  let result = Array.from({ length },
    () => new Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let res = 0;
      for (let k = 0; k < length; k++) {
        res += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = res;
    }
  }
  return result;
};

const powerMatrix = (matrix, num) => {
  let temp = [];
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
  let matrixObject = {
    1: matrix,
  };
  for (let i = 2; i <= length - 1; i++) {
    const num = i - 1;
    matrixObject[`${i}`] = multMatrix(matrix, matrixObject[`${num}`]);
  }
  let result = Array.from({ length },
    () => new Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let val = false;
      for (let key in matrixObject) {
        if (matrixObject[key][i][j]) {
          val = true;
          break;
        }
      }
      result[i][j] = val || i === j ? 1 : 0;
    }
  }
  return result;
};

const transMatrix = (matrix) => {
  const { length } = matrix;
  let result = Array.from({ length },
    () => Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      result[i][j] = matrix[j][i];
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
  const result = Array.from({ length },
    () => new Array(length));
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      result[i][j] = trans[i][j] * reach[i][j];
    }
  }
  return result;
};

const convertMatrixToString = (matrix) => {
  return matrix.map((row, i) => row[i] = row.join(""));
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
}
