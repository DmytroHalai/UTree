'use strict'

import {findDirMatrixPower} from "./vertexPower.js";

const isolAndHangingVertexes = (matrix) => {
    const powerArr = findDirMatrixPower(matrix);
    let result = {
        isolResult: [],
        hangResult: []
    };
    for (let i = 0; i < powerArr.length; i++){
        if (powerArr[i] === 1){
            result.hangResult.push(i + 1);
        }
        else if (powerArr[i] === 0){
            result.isolResult.push(i + 1);
        }
    }
    return result;
}

const hangVertex = (matrix) => {
    return isolAndHangingVertexes(matrix).hangResult;
}

const isolVertex = (matrix) => {
    return isolAndHangingVertexes(matrix).isolResult;
}

export {hangVertex, isolVertex};