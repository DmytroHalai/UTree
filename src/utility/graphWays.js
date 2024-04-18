'use strict'


import {cubeMatrix, squareMatrix} from "./matrix.js";

const findWays2 = (matrix) => {
    let result = [];
    const sqrMatrix = squareMatrix(matrix);
    const count = sqrMatrix[0].length;
    for (let i = 0; i < count; i++){
        for (let j = 0; j < count; j++){
            if (sqrMatrix[i][j] === 0) continue;
            for (let k = 0; k < count; k++){
                if (matrix[k][j] === 1 && matrix[i][k] === 1 && (k !== j || k !== i)){
                    result.push([i + 1, k + 1, j + 1]);
                }
            }
        }
    }
    return result;
}

const findWays3 = (matrix) => {
    let result = [];
    const cbMatrix = cubeMatrix(matrix);
    const count = cbMatrix[0].length;
    for (let i = 0; i < count; i++){
        for (let j = 0; j < count; j++){
            if (cbMatrix[i][j] === 0) continue;
            for (let k = 0; k < count; k++){
                if (matrix[i][k] === 1){
                    for (let f = 0; f < count; f++){
                        if (matrix[f][j] === 1){
                            if (matrix[k][f] === 1 && k !== f)
                                result.push([i + 1, k + 1, f + 1, j + 1])
                        }
                    }
                }
            }
        }
    }
    return result;
}

export {findWays2, findWays3}