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
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (matrix[i][j] === 1) {
        const vertexInfo = {
          startVer: i,
          endVer: j,
          radius: radius,
          matrix: matrix,
        };
        drawEdge(coords, vertexInfo, ctx, color, true);
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
  matrix = undirMatrix(matrix);
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j <= i; j++) {
      if (matrix[i][j]) {
        const vertexInfo = {
          startVer: i,
          endVer: j,
          radius: radius,
          matrix: matrix,
        };
        drawEdge(coords, vertexInfo, ctx, color, false);
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
  let condCoords = {
      xCoord: [],
      yCoord: [],
    },
    pointer = 0,
    arr = [],
    val = {
      start: [],
      end: [],
    };

  Object.entries(foundComp).forEach(([, value]) => {
    condCoords.xCoord.push(coords.xCoord[value[0]]);
    condCoords.yCoord.push(coords.yCoord[value[0]]);
    arr.push(value.map((value) => parseInt(value)));
  });
  const { length: condArrayLength } = arr;
  for (let i = 0; i < condArrayLength; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < matLength; k++) {
        if (matrix[k][arr[i][j]] === 1 && arr[i][j] !== k) {
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
      const startVertex = val.start[i];
      const endVertex = val.end[i];
      const angle = calculateAngle(condCoords, startVertex, endVertex);
      const valid = lineVal(condCoords, startVertex, endVertex, radius);
      if (valid !== null) {
        drawEllipse(condCoords, startVertex, endVertex, angle, ctx, radius);
        drawArrow(condCoords, startVertex, angle, radius, ctx, color, true);
      } else {
        drawLine(condCoords, startVertex, endVertex, ctx);
        drawArrow(condCoords, startVertex, angle, radius, ctx, color);
      }
    }
  }

  Object.entries(foundComp).forEach(() => {
    drawCondVertex(condCoords, pointer, radius, ctx);
    pointer++;
  });
};

module.exports = {
  drawDirGraph,
  drawCondGraph,
  drawUndirGraph,
};
