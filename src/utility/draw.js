'use strict'

import {calculateAngle, findVertexCoord, lineVal, vector, vectorModule} from "./utils.js";

const ARC_ROTATE = 0.5 + Math.PI / 3;
const ROTATE = 0.5;
const ARROW_LENGTH = 15;

const drawOnlyVertex = (Coords, i, ctx, radius, colorName) => {
    ctx.beginPath();
    ctx.arc(Coords.xCoord[i], Coords.yCoord[i], radius, 0, Math.PI * 2);
    ctx.strokeStyle = colorName;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText((i + 1).toString(), Coords.xCoord[i], Coords.yCoord[i]);
    ctx.closePath();
};

const drawStatus = (Coords, i,  ctx, radius, colorName, status) => {
    ctx.beginPath();
    ctx.arc(Coords.xCoord[i] + radius, Coords.yCoord[i] - radius, radius / 3, 0, Math.PI * 2);
    ctx.strokeStyle = colorName;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText(status, Coords.xCoord[i] + radius, Coords.yCoord[i] - radius);
    ctx.closePath();
};

const drawVertexes = (ctx, count, x, y, radius, status = '') => {
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < count; i++) {
        const Coords = findVertexCoord(count, x, y);
        if(status !== '') drawStatus(Coords, i, ctx, radius, "black", "н");
        drawOnlyVertex(Coords, i, ctx, radius);
    }
};

const drawStitch = (Coords, i, ctx, radius, colorName) => {
    ctx.beginPath();
    ctx.moveTo(Coords.xCoord[i], Coords.yCoord[i]);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = colorName;
    ctx.arc(Coords.xCoord[i] - radius, Coords.yCoord[i] - radius,
        radius, 0, Math.PI / 2, true);
    ctx.stroke();
    ctx.closePath();
};

const findStartEnd = (Coords, i, j, radius, angle) => {
    const xStart = Coords.xCoord[i] + radius * Math.cos(angle);
    const yStart = Coords.yCoord[i] + radius * Math.sin(angle);
    const xEnd = Coords.xCoord[j] - radius * Math.cos(angle);
    const yEnd = Coords.yCoord[j] - radius * Math.sin(angle);

    return {
        startX: xStart,
        startY: yStart,
        endX: xEnd,
        endY: yEnd
    }
}

const drawLine = (Coords, i, j, ctx, radius, angle, colorName) => {
    const points = findStartEnd(Coords, i, j, radius, angle)

    ctx.beginPath();
    ctx.strokeStyle = colorName;
    ctx.moveTo(points.startX, points.startY);
    ctx.lineTo(points.endX, points.endY);
    ctx.stroke();
    ctx.closePath();
}

const drawEllipse = (Coords, i, j, angle, ctx, radius, colorName) => {
    const points = findStartEnd(Coords, i, j, radius, angle)

    const middleX = (points.startX + points.endX) / 2;
    const middleY = (points.startY + points.endY) / 2;
    const newAngle = Math.atan2((points.endY - points.startY), (points.endX - points.startX));
    const triangleRadius = vectorModule(vector(points.startX, points.startY, points.endX, points.endY))
    ctx.beginPath();
    ctx.strokeStyle = colorName;
    ctx.moveTo(points.startX, points.startY);
    ctx.ellipse(middleX, middleY, triangleRadius / 2, radius * 2,
        newAngle, Math.PI, 0);
    ctx.stroke();
    ctx.closePath();
    return newAngle;
}

const leftRightArrow = (x, y, angle, rotate) => {
    return ({
        leftX: x - ARROW_LENGTH * Math.cos(angle + rotate),
        leftY: x - ARROW_LENGTH * Math.cos(angle - rotate),
        rightX: y - ARROW_LENGTH * Math.sin(angle + rotate),
        rightY: y - ARROW_LENGTH * Math.sin(angle - rotate)
    })
}

const arrow = (angle, xArrow, yArrow, ctx, colorName, isArc = false) => {
    const coords = isArc ? leftRightArrow(ARC_ROTATE) : leftRightArrow(ROTATE);
    ctx.beginPath();
    ctx.strokeStyle = colorName;
    ctx.moveTo(xArrow, yArrow);
    ctx.lineTo(coords.leftX, coords.leftY);
    ctx.moveTo(xArrow, yArrow);
    ctx.lineTo(coords.rightX, coords.rightY);
    ctx.stroke();
    ctx.closePath();
}

const drawArrow = (Coords, j, angle, vertexRadius, ctx, colorName, isArc) => {
    const xArrow = Coords.xCoord[j] - vertexRadius * Math.cos(angle);
    const yArrow = Coords.yCoord[j] - vertexRadius * Math.sin(angle);
    arrow(angle, xArrow, yArrow, ctx, colorName, isArc);
}

const drawEdge = (Coords, v, u, matrix, ctx, radius, colorName = 'black', isDir = false, isTrace = false) => {
    const angle = calculateAngle(Coords, v, u);
    const val = lineVal(Coords, v, u, radius);
    if (isTrace) drawStatus(Coords, u, ctx, radius, colorName, 'a');
    if (v === u) {
        drawStitch(Coords, v, ctx, radius, colorName);
         if (isDir) drawArrow(Coords, u, angle, radius, ctx, colorName, false);
    }
    else if (matrix[u][v] === 1 && v > u){
        drawEllipse(Coords, v, u, angle, ctx, radius, colorName);
        if (isDir) drawArrow(Coords, u, angle, radius, ctx, colorName, true);
    }
    else if (val){
        drawEllipse(Coords, v, u, angle, ctx, radius, colorName);
         if (isTrace) drawStatus(Coords, u, ctx, radius, colorName, 'в');
        if (isDir) drawArrow(Coords, u, angle, radius, ctx, colorName, true);
    }
    else {
        drawLine(Coords, v, u, ctx, radius, angle, colorName);
        if (isTrace) drawStatus(Coords, u, ctx, radius, colorName, 'в');
        if (isDir) drawArrow(Coords, u, angle, radius, ctx, colorName, false);
    }
}

const drawCondVertex = (Coords, i, radius, ctx) => {
    ctx.beginPath();
    ctx.arc(Coords.xCoord[i], Coords.yCoord[i], radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText(`K${parseInt(i)+1}`, Coords.xCoord[i], Coords.yCoord[i]);
    ctx.closePath();
}

export {drawCondVertex, drawVertexes, drawEdge, drawLine, drawArrow, drawEllipse}