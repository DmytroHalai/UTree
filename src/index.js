'use strict';

const { bfs } = require('./graphTrace/bfsMethod.js');
const { findComponents } = require('./findComponents.js');
const {
  drawDirGraph,
  drawUndirGraph,
  drawCondGraph,
} = require('./drawGraphs.js');
const { vertexesPower } = require('./vertexPower.js');
const { isRegular } = require('./graphRegularity.js');
const { isolVertex, hangVertex } = require('./findIsolatedVertexes.js');
const { findWay } = require('./graphWays.js');
const { dfs } = require('./graphTrace/dfsMethod.js');
const { reachMatrix, strongMatrix, multMatrix, transMatrix } = require('./matrix.js');

module.exports = {
  vertexesPower,
  isRegular,
  isolVertex,
  hangVertex,
  findWay,
  drawDirGraph,
  drawUndirGraph,
  drawCondGraph,
  dfs,
  bfs,
  findComponents,
  reachMatrix,
  strongMatrix,
  multMatrix,
  transMatrix,
};
