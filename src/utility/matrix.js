"use strict";

import { pseudoRandom } from "./utils.js";

const createDirMatrix = (count) => {
  const generator = pseudoRandom(count);
  let matrix = new Array(count);
  for (let i = 0; i < count; i++) {
    matrix[i] = new Array(count);
  }
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      matrix[i][j] = Math.floor(generator() * 1);
    }
  }
  return matrix;
};

const undirMatrix = (arr) => {
  let matrix = arr;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        matrix[j][i] = 1;
      }
    }
  }
  return matrix;
};

const multMatrix = (matrix1, matrix2) => {
  const count = matrix1[0].length;
  let result = new Array(count);
  for (let i = 0; i < count; i++) {
    result[i] = new Array(count);
  }
  for (let i = 0; i < matrix1[0].length; i++) {
    for (let j = 0; j < matrix1[0].length; j++) {
      let res = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        res += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = res;
    }
  }
  return result;
};

const squareMatrix = (matrix) => {
  return multMatrix(matrix, matrix);
};

const cubeMatrix = (matrix) => {
  return multMatrix(matrix, multMatrix(matrix, matrix));
};

const reachMatrix = (matrix) => {
  const count = matrix[0].length;
  let matrixObject = {
    1: matrix,
  };
  for (let i = 2; i <= count - 1; i++) {
    const num = i - 1;
    matrixObject[`${i}`] = multMatrix(matrix, matrixObject[`${num}`]);
  }
  let result = new Array(count);
  for (let i = 0; i < count; i++) {
    result[i] = new Array(count);
  }
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let val = false;
      for (let key in matrixObject) {
        if (matrixObject[key][i][j] > 0) {
          val = true;
          break;
        }
      }
      if (val || i === j) result[i][j] = 1;
      else result[i][j] = 0;
    }
  }
  return result;
};

const transMatrix = (matrix) => {
  const count = matrix[0].length;
  let result = new Array(count);
  for (let i = 0; i < count; i++) {
    result[i] = new Array(count);
  }
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};

const strongMatrix = (matrix) => {
  const count = matrix[0].length;
  const trans = transMatrix(matrix);
  const result = matrix;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      result[i][j] = trans[i][j] * matrix[i][j];
    }
  }
  return result;
};

const convertMatrixToString = (matrix) => {
  let result = {};
  matrix.forEach((row, index) => (result[index] = row.join("")));
  return result;
};

export {
  createDirMatrix,
  convertMatrixToString,
  cubeMatrix,
  multMatrix,
  reachMatrix,
  squareMatrix,
  strongMatrix,
  undirMatrix,
  transMatrix,
};
