"use strict";

const {
  convertMatrixToString,
  reachMatrix,
  strongMatrix,
  undirMatrix,
} = require("./matrix.js");
const {
  calculateAngle,
  checkRepeat,
  findVertexCoord,
  lineVal,
} = require("./utils.js");
const {
  drawCondVertex,
  drawVertexes,
  drawEdge,
  drawEllipse,
  drawArrow,
  drawLine,
} = require("./draw.js");
const { findComponents } = require("./findComponents.js");


/**
 * This method draws directed graph
 * @param {number} x The X-coordinate of the start of drawing
 * @param {number} y The X-coordinate of the start of drawing
 * @param {[[]]} matrix Adjacency matrix of the graph
 * @param {context} ctx Canvas 2d context
 * @param {number} radius Radius of the vertexes
 */
const drawDirGraph = (x, y, matrix, ctx, radius) => {
  const count = matrix.length;
  const coords = findVertexCoord(count, x, y);
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (matrix[i][j] === 1) {
        drawEdge(coords, i, j, matrix, ctx, radius, "black", true, false);
      }
    }
  }
};

/**
 * This method draws directed graph
 * @param {number} x The X-coordinate of the start of drawing
 * @param {number} y The X-coordinate of the start of drawing
 * @param {[[]]} matrix Adjacency matrix of the graph
 * @param {context} ctx Canvas 2d context
 * @param {number} radius Radius of the vertexes
 */
const drawUndirGraph = (x, y, matrix, ctx, radius) => {
  const count = matrix.length;
  const coords = findVertexCoord(count, x, y);
  matrix = undirMatrix(matrix);
  drawVertexes(ctx, count, x, y, radius);
  for (let i = 0; i < count; i++) {
    for (let j = 0; j <= i; j++) {
      if (matrix[i][j] === 1) {
        drawEdge(coords, i, j, matrix, ctx, radius, "black", false, false);
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
 */
const drawCondGraph = (x, y, matrix, ctx, radius) => {
  const foundComp = findComponents(
    convertMatrixToString(strongMatrix(reachMatrix(matrix))),
  );
  const count = matrix.length;
  const coords = findVertexCoord(count, x, y);
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

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < matrix[0].length; k++) {
        if (matrix[k][arr[i][j]] === 1 && arr[i][j] !== k) {
          for (let h = 0; h < arr.length; h++) {
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
      const angle = calculateAngle(condCoords, val.start[i], val.end[i]);
      const valid = lineVal(condCoords, val.start[i], val.end[i], radius);
      if (valid !== null) {
        drawEllipse(condCoords, val.start[i], val.end[i], angle, ctx, radius);
        drawArrow(condCoords, val.end[i], angle, radius, ctx, "black", 1);
      } else {
        drawLine(condCoords, val.start[i], val.end[i], ctx);
        drawArrow(condCoords, val.end[i], angle, radius, ctx);
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
}