'use strict';

const {
  convertMatrixToString,
  reachMatrix,
  strongMatrix,
  undirMatrix,
} = require('./matrix.js');
const {
  calculateAngle,
  checkRepeat,
  findVertexCoord,
  lineVal,
} = require('./utils.js');
const {
  drawCondVertex,
  drawVertexes,
  drawEdge,
  drawEllipse,
  drawArrow,
  drawLine,
} = require('./draw.js');
const { findComponents } = require('./findComponents.js');

/**
 * This method draws directed graph.
 * @param {number} x The X-coordinate of the start of drawing.
 * @param {number} y The X-coordinate of the start of drawing.
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @param {context} ctx Canvas 2d context.
 * @param {number} radius Radius of the vertexes.
 * @param color The color of the graph.
 */
const drawDirGraph = (x, y, matrix, ctx, radius, color = 'black') => {
  const count = matrix.length;
  const coords = findVertexCoord(count, x, y);
  const isDirected = true;
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const hasConnect = matrix[i][j] === 1;
      if (hasConnect) {
        const vertexInfo = {
          startVer: i,
          endVer: j,
          radius,
          matrix,
        };
        drawEdge(coords, vertexInfo, ctx, color, isDirected);
      }
    }
  }
};

/**
 * This method draws directed graph.
 * @param {number} x The X-coordinate of the start of drawing.
 * @param {number} y The X-coordinate of the start of drawing.
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @param {context} ctx Canvas 2d context.
 * @param {number} radius Radius of the vertexes.
 * @param color Color of the graph.
 */
const drawUndirGraph = (x, y, matrix, ctx, radius, color = 'black') => {
  const count = matrix.length;
  const coords = findVertexCoord(count, x, y);
  const isDirected = false;
  matrix = undirMatrix(matrix);
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j <= i; j++) {
      const hasConnect = matrix[i][j] === 1;
      if (hasConnect) {
        const vertexInfo = {
          startVer: i,
          endVer: j,
          radius,
          matrix,
        };
        drawEdge(coords, vertexInfo, ctx, color, isDirected);
      }
    }
  }
};

/**
 * This method draws condensation graph of your graph
 * @param {number} x The X-coordinate of the start of drawing
 * @param {number} y The X-coordinate of the start of drawing
 * @param {[[]]} matrix Adjacency matrix of the graph
 * @param {context} ctx Canvas 2d context
 * @param {number} radius Radius of the vertexes
 * @param color Color of the graph
 */
const drawCondGraph = (x, y, matrix, ctx, radius, color = 'black') => {
  const foundComp = findComponents(
    convertMatrixToString(strongMatrix(reachMatrix(matrix))),
  );
  const { length: matLength } = matrix;
  const coords = findVertexCoord(matLength, x, y);
  const condCoords = {
    xCoord: [],
    yCoord: [],
  };
  const arr = [];
  const val = {
    start: [],
    end: [],
  };

  for (const [, value] of Object.entries(foundComp)) {
    condCoords.xCoord.push(coords.xCoord[value[0]]);
    condCoords.yCoord.push(coords.yCoord[value[0]]);
    arr.push(value.map((value) => parseInt(value)));
  }

  const { length: condArrayLength } = arr;
  for (let i = 0; i < condArrayLength; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < matLength; k++) {
        const row = k;
        const col = arr[i][j];
        const hasConnect = matrix[row][col] === 1;
        const isStitch = col === row;
        if (hasConnect && !isStitch) {
          for (let h = 0; h < condArrayLength; h++) {
            const index = arr[h].indexOf(k);
            if (index >= 0 && h !== i) {
              val.start.push(h);
              val.end.push(i);
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < val.start.length; i++) {
    if (checkRepeat(val, i)) {
      const startVer = val.start[i];
      const endVer = val.end[i];
      const angle = calculateAngle(condCoords, startVer, endVer);
      const valid = lineVal(condCoords, startVer, endVer, radius);
      const vertexInfo = { startVer, endVer, radius };
      if (valid) {
        const isArc = true;
        drawEllipse(condCoords, vertexInfo, angle, ctx);
        drawArrow(condCoords, vertexInfo, angle, ctx, color, isArc);
      } else {
        drawLine(condCoords, startVer, endVer, ctx);
        drawArrow(condCoords, vertexInfo, angle, ctx, color);
      }
    }
  }

  const entries = Object.entries(foundComp);
  for (let i = 0; i < entries.length; i++) {
    drawCondVertex(condCoords, i, radius, ctx);
  }
};

module.exports = {
  drawDirGraph,
  drawCondGraph,
  drawUndirGraph,
};
