'use strict'

import {Queue} from "./classes.js";

const bfs = (matrix, a) => {
    const count = matrix.length;
    const checked = 1,
        unChecked = 0;
    const bfsMatrix = new Array(count).fill(unChecked);
    const q = new Queue();
    const checkNumbers = new Array(count).fill(unChecked);
    let pointer = 0;
    let checkNumber = 1;
    bfsMatrix.forEach((value, index) => {
        bfsMatrix[index] = new Array(count).fill(unChecked);
    })
    checkNumbers[a] = checked;
    q.enqueue(a);
    while (!q.isEmpty()){
        const v = q.dequeue();
        for (let u = 0; u < count; u++){
            if (matrix[v][u] === 1 && checkNumbers[u] === unChecked){
                checkNumber++;
                bfsMatrix[v][u] = 1;
                checkNumbers[u] = checkNumber;
                q.enqueue(u);
            }
        }
        pointer++;
    }
    return {bfsMatrix, checkNumbers};
};

export {bfs};