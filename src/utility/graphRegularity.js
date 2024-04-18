'use strict'

import {findDirMatrixPower} from "./vertexPower.js";

const isRegular = (matrix) => {
    const powerDir = findDirMatrixPower(matrix);
    const val = powerDir[0];
    for (const item of powerDir) {
        if (val !== item) {
            return false;
        }
    }
    return true;
}

export {isRegular};