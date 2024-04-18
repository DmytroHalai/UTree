'use strict'

const findUndirMatrixPower = (matrix) => {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++){
        let counter = 0;
        for (let j = 0; j < matrix[0].length; j++){
            if (matrix[i][j] === 1){
                if (i === j) counter++;
                counter++;
            }
        }
        result.push(counter);
    }
    return result;
};

const findDirMatrixPower = (matrix) => {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++){
        let counter = 0;
        for (let j = 0; j < matrix[0].length; j++){
            if (matrix[i][j] === 1 || matrix[j][i] === 1){
                if (i === j) counter++;
                counter++;
            }
        }
        result.push(counter);
    }
    return result;
};

const findDirMatrixEnterPower = (matrix) => {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++){
        let counter = 0;
        for (let j = 0; j < matrix[0].length; j++){
            if (matrix[j][i] === 1){
                counter++;
            }
        }
        result.push(counter);
    }
    return result;
};

const findDirMatrixExitPower = (matrix) => {
    const result = [];
    for (let i = 0; i < matrix[0].length; i++){
        let counter = 0;
        for (let j = 0; j < matrix[0].length; j++){
            if (matrix[i][j] === 1){
                counter++;
            }
        }
        result.push(counter);
    }
    return result;
};

const vertexesPower = (matrix) => {
    return {
        dir: findDirMatrixPower(matrix),
        undir: findUndirMatrixPower(matrix),
        dirEnter: findDirMatrixEnterPower(matrix),
        dirExit: findDirMatrixExitPower(matrix)
    }
};

export {vertexesPower, findDirMatrixPower}