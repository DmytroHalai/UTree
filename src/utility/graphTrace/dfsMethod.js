'use strict'

import {Stack} from "./classes.js";

const dfs = (matrix, a) => {
    const count = matrix.length,
        checked = 1,
        unChecked = 0;
    const dfsMatrix = new Array(count).fill(unChecked);
    const s = new Stack();
    const checkNumbers = new Array(count).fill(unChecked);
    let pointer = 0;
    let checkNumber = 1;
    dfsMatrix.forEach((value, index) => {
        dfsMatrix[index] = new Array(count).fill(unChecked);
    });
    checkNumbers[a] = checked;
    s.push(a);
    while (!s.isEmpty()){
        const v = s.first();
        for (let u = 0; u < count; u++){
            if (matrix[v][u] === 1 && checkNumbers[u] === unChecked){
                dfsMatrix[v][u] = 1;
                checkNumber++;
                checkNumbers[u] = checkNumber;
                s.push(u);
                break;
            }
            else if (u === count - 1) s.pop();
        }
        pointer++;
    }
    return {dfsMatrix, checkNumbers};
}

export {dfs};