"use strict";

import {
  calculateAngle,
  findVertexCoord,
  lineVal,
  vector,
  vectorModule,
} from "./utils.js";

const ARC_ROTATE = 0.5 + Math.PI / 3;
const ROTATE = 0.5;
const ARROW_LENGTH = 15;

const drawOnlyVertex = (coords, i, ctx, radius, colorName) => {
  ctx.beginPath();
  ctx.arc(coords.xCoord[i], coords.yCoord[i], radius, 0, Math.PI * 2);
  ctx.strokeStyle = colorName;
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.fillText((i + 1).toString(), coords.xCoord[i], coords.yCoord[i]);
  ctx.closePath();
};

const drawStatus = (coords, i, ctx, radius, colorName, status) => {
  ctx.beginPath();
  ctx.arc(
    coords.xCoord[i] + radius,
    coords.yCoord[i] - radius,
    radius / 3,
    0,
    Math.PI * 2,
  );
  ctx.strokeStyle = colorName;
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.fillText(status, coords.xCoord[i] + radius, coords.yCoord[i] - radius);
  ctx.closePath();
};

const drawVertexes = (ctx, count, x, y, radius, status = "") => {
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < count; i++) {
    const coords = findVertexCoord(count, x, y);
    if (status !== "") drawStatus(coords, i, ctx, radius, "black", "н");
    drawOnlyVertex(coords, i, ctx, radius);
  }
};

const drawStitch = (coords, i, ctx, radius, colorName) => {
  ctx.beginPath();
  ctx.moveTo(coords.xCoord[i], coords.yCoord[i]);
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.arc(
    coords.xCoord[i] - radius,
    coords.yCoord[i] - radius,
    radius,
    0,
    Math.PI / 2,
    true,
  );
  ctx.stroke();
  ctx.closePath();
};

const findStartEnd = (coords, i, j, radius, angle) => {
  const xStart = coords.xCoord[i] + radius * Math.cos(angle);
  const yStart = coords.yCoord[i] + radius * Math.sin(angle);
  const xEnd = coords.xCoord[j] - radius * Math.cos(angle);
  const yEnd = coords.yCoord[j] - radius * Math.sin(angle);

  return {
    startX: xStart,
    startY: yStart,
    endX: xEnd,
    endY: yEnd,
  };
};

const drawLine = (coords, i, j, ctx, radius, angle, colorName) => {
  const points = findStartEnd(coords, i, j, radius, angle);

  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(points.startX, points.startY);
  ctx.lineTo(points.endX, points.endY);
  ctx.stroke();
  ctx.closePath();
};

const drawEllipse = (coords, i, j, angle, ctx, radius, colorName) => {
  const points = findStartEnd(coords, i, j, radius, angle);

  const middleX = (points.startX + points.endX) / 2;
  const middleY = (points.startY + points.endY) / 2;
  const newAngle = Math.atan2(
    points.endY - points.startY,
    points.endX - points.startX,
  );
  const triangleRadius = vectorModule(
    vector(points.startX, points.startY, points.endX, points.endY),
  );
  ctx.beginPath();
  ctx.strokeStyle = colorName;
  ctx.moveTo(points.startX, points.startY);
  ctx.ellipse(
    middleX,
    middleY,
    triangleRadius / 2,
    radius * 2,
    newAngle,
    Math.PI,
    0,
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
};

const drawArrow = (coords, j, angle, vertexRadius, ctx, colorName, isArc) => {
  const xArrow = coords.xCoord[j] - vertexRadius * Math.cos(angle);
  const yArrow = coords.yCoord[j] - vertexRadius * Math.sin(angle);
  arrow(angle, xArrow, yArrow, ctx, colorName, isArc);
};

const drawEdge = (
  coords,
  v,
  u,
  matrix,
  ctx,
  radius,
  colorName = "black",
  isDir = false,
  isTrace = false,
) => {
  const angle = calculateAngle(coords, v, u);
  const val = lineVal(coords, v, u, radius);
  if (isTrace) drawStatus(coords, u, ctx, radius, colorName, "a");
  if (v === u) {
    drawStitch(coords, v, ctx, radius, colorName);
    if (isDir) drawArrow(coords, u, angle, radius, ctx, colorName, false);
  } else if (matrix[u][v] === 1 && v > u) {
    drawEllipse(coords, v, u, angle, ctx, radius, colorName);
    if (isDir) drawArrow(coords, u, angle, radius, ctx, colorName, true);
  } else if (val) {
    drawEllipse(coords, v, u, angle, ctx, radius, colorName);
    if (isTrace) drawStatus(coords, u, ctx, radius, colorName, "в");
    if (isDir) drawArrow(coords, u, angle, radius, ctx, colorName, true);
  } else {
    drawLine(coords, v, u, ctx, radius, angle, colorName);
    if (isTrace) drawStatus(coords, u, ctx, radius, colorName, "в");
    if (isDir) drawArrow(coords, u, angle, radius, ctx, colorName, false);
  }
};

const drawCondVertex = (coords, i, radius, ctx) => {
  ctx.beginPath();
  ctx.arc(coords.xCoord[i], coords.yCoord[i], radius, 0, Math.PI * 2);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.fillText(`K${parseInt(i) + 1}`, coords.xCoord[i], coords.yCoord[i]);
  ctx.closePath();
};

export {
  drawCondVertex,
  drawVertexes,
  drawEdge,
  drawLine,
  drawArrow,
  drawEllipse,
};
