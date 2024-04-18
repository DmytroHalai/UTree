'use strict'

const vector = (x1, y1, x2, y2) => {
    const x = x2 - x1,
        y = y2 - y1;
    return {
        x: x,
        y: y
    }
};

const vectorModule = (vector) => {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

const pseudoRandom = (seed) => {
    let value = seed;

    return function() {
        value = (value * 1103515245 + 12345) % 2147483648;
        return value % 100 < 25;
    }
};

const findVertexCoord = (vertexCount, firstCoordX, firstCoordy, ctxHeight, ctxWeight) => {
    let Coords = {
        xCoord: [],
        yCoord: []
    };
    const vertexesPerSide = Math.floor(vertexCount / 4); // 4 is amount of sides in rectangle
    const vertexAmount = {
        '1': vertexesPerSide,
        '2': vertexesPerSide,
        '3': vertexesPerSide,
        '4': vertexesPerSide + vertexCount % vertexesPerSide
    };
    let pointer = 1;
    const heightInterval = ctxHeight / vertexesPerSide,
        weightInterval = ctxWeight / vertexesPerSide,
        lastSideInterval = ctxHeight / vertexAmount['4'];
    Coords.xCoord[0] = firstCoordX;
    Coords.yCoord[0] = firstCoordy;
    for (let i = 1; i < vertexCount; i++){
        switch (pointer) {
            case 1:
                Coords.xCoord[i] = Coords.xCoord[i-1] + weightInterval;
                Coords.yCoord[i] = Coords.yCoord[i-1];
                break;
            case 2:
                Coords.xCoord[i] = Coords.xCoord[i-1];
                Coords.yCoord[i] = Coords.yCoord[i-1] + heightInterval;
                break;
            case 3:
                Coords.xCoord[i] = Coords.xCoord[i-1] - weightInterval;
                Coords.yCoord[i] = Coords.yCoord[i-1];
                break;
            case 4:
                Coords.xCoord[i] = Coords.xCoord[i-1];
                Coords.yCoord[i] = Coords.yCoord[i-1] - lastSideInterval;
                break;
        }
        pointer = pointer * 3 > i ? pointer : pointer + 1;
    }
    return Coords;
};

const lineVal = (Coords, i, j, radius) => {
    const startX = Coords.xCoord[i];
    const startY = Coords.yCoord[i];
    const endX = Coords.xCoord[j];
    const endY = Coords.yCoord[j];
    const vector1 = vector(startX, startY, endX, endY);
    const a = vectorModule(vector1);
    let valResult = null;
    for (let k = 0; k < Coords.xCoord.length; k++){
        if(k === i || k === j) continue;
        if(Math.abs(j - i) === 1) break;
        const vector2 = vector(startX, startY, Coords.xCoord[k], Coords.yCoord[k]);
        const vector3 = vector(Coords.xCoord[k], Coords.yCoord[k], endX, endY);
        const b = vectorModule(vector2);
        const c = vectorModule(vector3);
        const p = (a + b + c) / 2;
        const height = Math.sqrt(p * (p - a) * (p - b) * (p - c)) * 2 / a;
        if (height < radius) {
            valResult = a;
            break;
        }
    }
    return valResult;
};

const calculateAngle = (Coords, i, j) => {
    const startX = Coords.xCoord[i];
    const startY = Coords.yCoord[i];
    const endX = Coords.xCoord[j];
    const endY = Coords.yCoord[j];
    return Math.atan2(endY - startY, endX - startX);
};

const checkRepeat = (val, i) => {
    const startC = val.start[i],
        endC = val.end[i];
    let result = true
    for (let j = 0; j < val.start.length; j++){
        if (startC === val.start[j] && endC === val.end[j] && j > i){
            result = false;
        }
    }
    return result;
};

export {lineVal, vector, pseudoRandom, checkRepeat, vectorModule, findVertexCoord, calculateAngle};