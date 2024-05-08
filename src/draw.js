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
  ctx.fillText(
    (vertex + 1).toString(),
    coords.xCoord[vertex],
    coords.yCoord[vertex],
  );
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
  const arcX = coords.xCoord[vertex] - radius;
  const arcY = coords.yCoord[vertex] - radius;
  const startRad = 0;
  const fullCircle = Math.PI * 2;
  ctx.beginPath();
  ctx.moveTo(vertX, vertY);
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.arc(arcX, arcY, radius, startRad, fullCircle, true);
  ctx.stroke();
  ctx.closePath();
};

const findStartEnd = (coords, startVertex, endVertex, radius, angle) => {
  return {
    startX: coords.xCoord[startVertex] + radius * Math.cos(angle),
    startY: coords.yCoord[startVertex] + radius * Math.sin(angle),
    endX: coords.xCoord[endVertex] - radius * Math.cos(angle),
    endY: coords.yCoord[endVertex] - radius * Math.sin(angle),
  };
};

const drawLine = (coords, vertexInfo, ctx, angle, colorName) => {
  const {
    startVer: startVertex,
    endVer: endVertex,
    radius: radius,
  } = vertexInfo;
  const points = findStartEnd(coords, startVertex, endVertex, radius, angle);
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(points.startX, points.startY);
  ctx.lineTo(points.endX, points.endY);
  ctx.stroke();
  ctx.closePath();
};

const drawEllipse = (coords, vertexInfo, angle, ctx, colorName) => {
  const {
    startVer: startVertex,
    endVer: endVertex,
    radius: radius,
  } = vertexInfo;
  const points = findStartEnd(coords, startVertex, endVertex, radius, angle);
  const middleX = (points.startX + points.endX) / 2;
  const middleY = (points.startY + points.endY) / 2;
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
  const { endVer: vertex, radius: vertexRadius } = vertexInfo;
  const xArrow = coords.xCoord[vertex] - vertexRadius * Math.cos(angle);
  const yArrow = coords.yCoord[vertex] - vertexRadius * Math.sin(angle);
  arrowWrapper(angle, xArrow, yArrow, ctx, colorName, isArc);
};

const drawEdge = (
  coords,
  vertexesInfo,
  ctx,
  colorName = 'black',
  isDir = false,
) => {
  const { startVer: startVertex } = vertexesInfo;
  const { endVer: endVertex } = vertexesInfo;
  const { radius: vertexRadius } = vertexesInfo;
  const { matrix } = vertexesInfo;
  const angle = calculateAngle(coords, startVertex, endVertex);
  const val = lineVal(coords, startVertex, endVertex, vertexRadius);
  const isStitch = startVertex === endVertex;
  const isLineBack = matrix[endVertex][startVertex] && startVertex > endVertex;
  if (isStitch) {
    drawStitch(coords, startVertex, ctx, vertexRadius, colorName);
    if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName);
    return;
  }
  if (isLineBack || val) {
    drawEllipse(coords, vertexesInfo, angle, ctx, colorName);
    if (isDir) drawArrow(coords, vertexesInfo, angle, ctx, colorName, true);
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
