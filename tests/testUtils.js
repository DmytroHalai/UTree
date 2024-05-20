'use strict';

const compareMatrix = (matrix1, matrix2) => {
  const { length: matrix1Length } = matrix1;
  const { length: matrix2Length } = matrix2;
  if (matrix1Length !== matrix2Length) return false;
  for (let i = 0; i < matrix1Length; i++) {
    for (let j = 0; j < matrix1Length; j++) {
      if (matrix1[i][j] !== matrix2[i][j]) return false;
    }
  }
  return true;
};

const compareArray = (a, b) => JSON.stringify(a) === JSON.stringify(b);

module.exports = { compareMatrix, compareArray };
