'use strict'

import {convertMatrixToString, reachMatrix, strongMatrix, undirMatrix} from "./matrix.js";
import {calculateAngle, checkRepeat, findVertexCoord, lineVal} from "./utils.js";
import {drawCondVertex, drawVertexes, drawEdge, drawEllipse, drawArrow, drawLine} from "./draw.js";
import {findComponents} from "./findComponents.js";

const drawDirGraph = (x, y, matrix, ctx, radius) => {
    const count = matrix.length;
    const Coords = findVertexCoord(count, x, y);
    drawVertexes(ctx, count, x, y, radius);
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            if (matrix[i][j] === 1) {
                drawEdge(Coords, i, j, matrix, ctx, radius, 'black', true, false);
            }
        }
    }
};

const drawUndirGraph = (x, y, matrix, ctx, radius) => {
    const count = matrix.length;
    const Coords = findVertexCoord(count, x, y);
    matrix = undirMatrix(matrix);
    drawVertexes(ctx, count, x, y, radius);
    for (let i = 0; i < count; i++) {
        for (let j = 0; j <= i; j++) {
            if (matrix[i][j] === 1) {
                drawEdge(Coords, i, j, matrix, ctx, radius, 'black', false, false);
            }
        }
    }
};

const drawCondGraph = (x, y, matrix, ctx, radius) => {
    const foundComp = findComponents(convertMatrixToString(strongMatrix(reachMatrix(matrix))));
    const count = matrix.length;
    const Coords = findVertexCoord(count, x, y);
    let CondCoords = {
            xCoord: [],
            yCoord: []
        },
        pointer = 0,
        arr = [],
        val = {
            start: [],
            end: []
        };

    Object.entries(foundComp).forEach(([, value]) => {
        CondCoords.xCoord.push(Coords.xCoord[value[0]]);
        CondCoords.yCoord.push(Coords.yCoord[value[0]]);
        arr.push(value.map((value) => parseInt(value)));
    });

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            for (let k = 0; k < matrix[0].length; k++) {
                if (matrix[k][arr[i][j]] === 1 && arr[i][j] !== k) {
                    for (let h = 0; h < arr.length; h++) {
                        const index = arr[h].indexOf(k);
                        if (index >= 0 && h !== i){
                            val.start.push(h);
                            val.end.push(i);
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < val.start.length; i++){
        if (checkRepeat(val, i)){
            const angle = calculateAngle(CondCoords, val.start[i], val.end[i]);
            const valid = lineVal(CondCoords, val.start[i],  val.end[i], radius);
            if (valid !== null){
                drawEllipse(CondCoords, val.start[i],  val.end[i], angle, ctx, radius);
                drawArrow(CondCoords, val.end[i], angle, radius, ctx, 'black', 1);
            }
            else{
                drawLine(CondCoords, val.start[i],  val.end[i], ctx);
                drawArrow(CondCoords, val.end[i], angle, radius, ctx);
            }
        }
    }

    Object.entries(foundComp).forEach(() => {
        drawCondVertex(CondCoords, pointer, radius, ctx);
        pointer++;
    });
};

export {drawDirGraph, drawCondGraph, drawUndirGraph};