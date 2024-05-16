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
  ctx.beginPath();
  ctx.arc(x, y, radius, startRad, fullCircle);
  ctx.strokeStyle = colorName;
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.fillText((vertex + 1).toString(), x, y);
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
  return {
    startX: coords.xCoord[startVertex] + radius * cos,
    startY: coords.yCoord[startVertex] + radius * sin,
    endX: coords.xCoord[endVertex] - radius * cos,
    endY: coords.yCoord[endVertex] - radius * sin,
  };
};

const drawLine = (coords, vertexInfo, ctx, angle, colorName) => {
  const { startVer, endVer, radius } = vertexInfo;
  const points = findStartEnd(coords, startVer, endVer, radius, angle);
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(points.startX, points.startY);
  ctx.lineTo(points.endX, points.endY);
  ctx.stroke();
  ctx.closePath();
};

const findAvg = (x, y) => {
  return (x + y) / 2;
};

const drawEllipse = (coords, vertexInfo, angle, ctx, colorName) => {
  const { startVer, endVer, radius } = vertexInfo;
  const points = findStartEnd(coords, startVer, endVer, radius, angle);
  const middleX = findAvg(points.startX, points.endX);
  const middleY = findAvg(points.startY, points.endY);
  const newAngle = Math.atan2(
    points.endY - points.startY,
    points.endX - points.startX,
  );
  const triangleRadius = vectorModule(
    vector(points.startX, points.startY, points.endX, points.endY),
  );
  const ellipseHeight = radius * 2;
  const ellipseWidth = triangleRadius / 2;
  const startRad = Math.PI;
  const endRad = 0;
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(points.startX, points.startY);
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
  return {
    leftX: x - ARROW_LENGTH * Math.cos(angle + rotate),
    leftY: x - ARROW_LENGTH * Math.cos(angle - rotate),
    rightX: y - ARROW_LENGTH * Math.sin(angle + rotate),
    rightY: y - ARROW_LENGTH * Math.sin(angle - rotate),
  };
};

const arrowWrapper = (angle, xArrow, yArrow, ctx, colorName, isArc = false) => {
  const coords = isArc ? leftRightArrow(ARC_ROTATE) : leftRightArrow(ROTATE);
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(xArrow, yArrow);
  ctx.lineTo(coords.leftX, coords.leftY);
  ctx.moveTo(xArrow, yArrow);
  ctx.lineTo(coords.rightX, coords.rightY);
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

const drawEdge = (
  coords,
  vertexesInfo,
  ctx,
  colorName = 'black',
  isDir = false,
) => {
  const { startVer, endVer, radius, matrix } = vertexesInfo;
  const angle = calculateAngle(coords, startVer, endVer);
  const val = lineVal(coords, startVer, endVer, radius);
  const isStitch = startVer === endVer;
  const isLineBack = matrix[endVer][startVer] && startVer > endVer;
  if (isStitch) {
    drawStitch(coords, startVer, ctx, radius, colorName);
    if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName);
    return;
  }
  if (isLineBack || val) {
    const isArc = true;
    drawEllipse(coords, vertexesInfo, angle, ctx, colorName);
    if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName, isArc);
  } else {
    drawLine(coords, vertexesInfo, ctx, angle, colorName);
    if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName);
  }
};

const drawCondVertex = (coords, vertex, radius, ctx) => {
  const x = coords.xCoord[vertex];
  const y = coords.yCoord[vertex];
  const startRad = 0;
  const fullCircle = Math.PI * 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, startRad, fullCircle);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.fillText(`K${parseInt(vertex) + 1}`, x, y);
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
