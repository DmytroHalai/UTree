'use strict';

const compareMatrix = (matrix1, matrix2) => {
  const { length } = matrix1;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (matrix1[i][j] !== matrix2[i][j]) return false;
    }
  }
  return true;
}

module.exports = { compareMatrix };