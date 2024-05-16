'use strict';

const assert = require('node:assert').strict;
const { multMatrix } = require('../src');
const { compareMatrix } = require('./utils.js')

const matrixMult = () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const matrix2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const matrixResult = [
    [30, 36, 42],
    [66, 81, 96],
    [102, 126, 150],
  ];
  const result = true;
  const mult = multMatrix(matrix, matrix2)
  assert.strictEqual(compareMatrix(mult, matrixResult), result, 'Matrix multiplication works not correct');
};

const negativeMatrixMult = () => {
  const matrix = [
    [-2, 13, -11],
    [-22, 17, -1],
    [-14, -28, 9],
  ];
  const matrix2 = [
    [2, 3, -222],
    [22, -17, -11],
    [-4, 2, 99],
  ];
  const matrixResult = [
    [326, -249, -788],
    [334, -357, 4598],
    [-680, 452, 4307],
  ];
  const result = true;
  const mult = multMatrix(matrix, matrix2)
  assert.strictEqual(compareMatrix(mult, matrixResult), result, 'Negative matrix multiplication works not correct');
};

const zeroMatrixMult = () => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const matrix2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const matrixResult = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const result = true;
  const mult = multMatrix(matrix, matrix2)
  assert.strictEqual(compareMatrix(mult, matrixResult), result, 'Zero matrix multiplication works not correct');
};



const tests = [
  matrixMult,
  zeroMatrixMult,
  negativeMatrixMult,
]

for (const test of tests) {
  try {
    test();
  } catch (err) {
    console.log(err);
  }
}