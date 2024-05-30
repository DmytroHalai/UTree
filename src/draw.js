'use strict';

const {
  calculateAngle,
  findVertexCoord,
  lineVal,
  vector,
  vectorModule,
} = require('./utils.js');

const ARC_ROTATE = 0.5 + Math.PI / 3;
const ROTATE = 0.5;
const ARROW_LENGTH = 15;

const drawOnlyVertex = (coords, vertex, ctx, radius, colorName) => {
  const fullCircle = Math.PI * 2;
  const x = coords.xCoord[vertex];
  const y = coords.yCoord[vertex];
  const startRad = 0;
  const vertexNumber = (vertex + 1).toString();
  ctx.beginPath();
  ctx.arc(x, y, radius, startRad, fullCircle);
  ctx.strokeStyle = colorName;
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.fillText(vertexNumber, x, y);
  ctx.closePath();
};

const drawVertexes = (ctx, count, x, y, radius) => {
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const coords = findVertexCoord(count, x, y);
  for (let i = 0; i < count; i++) {
    drawOnlyVertex(coords, i, ctx, radius);
  }
};

const drawStitch = (coords, vertex, ctx, radius, colorName) => {
  const vertX = coords.xCoord[vertex];
  const vertY = coords.yCoord[vertex];
  const arcX = vertX - radius;
  const arcY = vertY - radius;
  const startRad = 0;
  const fullCircle = Math.PI * 2;
  const isClockWise = true;
  ctx.beginPath();
  ctx.moveTo(vertX, vertY);
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.arc(arcX, arcY, radius, startRad, fullCircle, isClockWise);
  ctx.stroke();
  ctx.closePath();
};

const findStartEnd = (coords, startVertex, endVertex, radius, angle) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const start = {
    x: coords.xCoord[startVertex] + radius * cos,
    y: coords.yCoord[startVertex] + radius * sin,
  };
  const end = {
    x: coords.xCoord[endVertex] - radius * cos,
    y: coords.yCoord[endVertex] - radius * sin,
  };
  return { start, end };
};

const drawLine = (coords, vertexInfo, ctx, angle, colorName) => {
  const { startVer, endVer, radius } = vertexInfo;
  const { start, end } = findStartEnd(coords, startVer, endVer, radius, angle);
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.closePath();
};

const findAvg = (x, y) => {
  return (x + y) / 2;
};

const drawEllipse = (coords, vertexInfo, angle, ctx, colorName) => {
  const { startVer, endVer, radius } = vertexInfo;
  const { start, end } = findStartEnd(coords, startVer, endVer, radius, angle);
  const middleX = findAvg(start.x, end.x);
  const middleY = findAvg(start.y, end.y);
  const newAngle = Math.atan2(
    end.y - start.y,
    end.x - start.x,
  );
  const triangleRadius = vectorModule(
    vector(start.x, start.y, end.x, end.y),
  );
  const ellipseHeight = radius * 2;
  const ellipseWidth = triangleRadius / 2;
  const startRad = Math.PI;
  const endRad = 0;
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(start.x, start.y);
  ctx.ellipse(
    middleX,
    middleY,
    ellipseWidth,
    ellipseHeight,
    newAngle,
    startRad,
    endRad,
  );
  ctx.stroke();
  ctx.closePath();
  return newAngle;
};

const leftRightArrow = (x, y, angle, rotate) => {
  const left = {
    x: x - ARROW_LENGTH * Math.cos(angle + rotate),
    y: x - ARROW_LENGTH * Math.cos(angle - rotate),
  };
  const right = {
    x: y - ARROW_LENGTH * Math.sin(angle + rotate),
    y: y - ARROW_LENGTH * Math.sin(angle - rotate),
  };
  return { left, right };
};

const arrowWrapper = (angle, xArrow, yArrow, ctx, colorName, isArc = false) => {
  const { left, right } = isArc ? leftRightArrow(ARC_ROTATE) : leftRightArrow(ROTATE);
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(xArrow, yArrow);
  ctx.lineTo(left.x, left.y);
  ctx.moveTo(xArrow, yArrow);
  ctx.lineTo(right.x, right.y);
  ctx.stroke();
  ctx.closePath();
};

const drawArrow = (
  coords,
  vertexInfo,
  angle,
  ctx,
  colorName,
  isArc = false,
) => {
  const { endVer, radius } = vertexInfo;
  const xArrow = coords.xCoord[endVer] - radius * Math.cos(angle);
  const yArrow = coords.yCoord[endVer] - radius * Math.sin(angle);
  arrowWrapper(angle, xArrow, yArrow, ctx, colorName, isArc);
};

const drawStitchEdge = (coords, vertexesInfo, ctx, colorName, isDir) => {
  const { startVer, radius } = vertexesInfo;
  drawStitch(coords, startVer, ctx, radius, colorName);
  if (isDir) {
    const angle = calculateAngle(coords, startVer, startVer);
    drawArrow(coords, vertexesInfo, angle, ctx, colorName);
  }
};

const drawArcEdge = (coords, vertexesInfo, ctx, colorName, isDir) => {
  const { startVer, endVer } = vertexesInfo;
  const angle = calculateAngle(coords, startVer, endVer);
  drawEllipse(coords, vertexesInfo, angle, ctx, colorName);
  if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName, true);
};

const drawStraightEdge = (coords, vertexesInfo, ctx, colorName, isDir) => {
  const { startVer, endVer } = vertexesInfo;
  const angle = calculateAngle(coords, startVer, endVer);
  drawLine(coords, vertexesInfo, ctx, angle, colorName);
  if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName);
};

const drawEdge = (
  coords,
  vertexesInfo,
  ctx,
  colorName = 'black',
  isDir = false,
) => {
  const { startVer, endVer, radius, matrix } = vertexesInfo;
  const val = lineVal(coords, startVer, endVer, radius);
  const isStitch = startVer === endVer;
  const isLineBack = matrix[endVer][startVer] && startVer > endVer;

  if (isStitch) {
    drawStitchEdge(coords, vertexesInfo, ctx, colorName, isDir);
  } else if (isLineBack || val) {
    drawArcEdge(coords, vertexesInfo, ctx, colorName, isDir);
  } else {
    drawStraightEdge(coords, vertexesInfo, ctx, colorName, isDir);
  }
};

const drawCondVertex = (coords, vertex, radius, ctx) => {
  const x = coords.xCoord[vertex];
  const y = coords.yCoord[vertex];
  const startRad = 0;
  const fullCircle = Math.PI * 2;
  const vertexNumber = parseInt(vertex) + 1;
  ctx.beginPath();
  ctx.arc(x, y, radius, startRad, fullCircle);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.fillText(`K${vertexNumber}`, x, y);
  ctx.closePath();
};

module.exports = {
  drawCondVertex,
  drawVertexes,
  drawEdge,
  drawLine,
  drawArrow,
  drawEllipse,
};
