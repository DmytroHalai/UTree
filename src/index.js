"use strict";

const { bfs } = require("./utility/graphTrace/bfsMethod.js");
const { findComponents } =  require("./utility/findComponents.js");
const { drawDirGraph,
  drawUndirGraph,
  drawCondGraph } = require("./utility/drawGraphs.js");
const { vertexesPower } = require("./utility/vertexPower.js");
const { isRegular } = require("./utility/graphRegularity.js");
const { isolVertex, hangVertex } = require("./utility/findIsolatedVertexes.js");
const { findWay } = require("./utility/graphWays.js");
const { dfs } = require("./utility/graphTrace/dfsMethod.js")
const { reachMatrix, strongMatrix } = require("./utility/matrix.js");

module.exports = {
  vertexesPower: vertexesPower,
  isRegular: isRegular,
  isolVertex: isolVertex,
  hangVertex: hangVertex,
  findWay: findWay,
  drawDirGraph: drawDirGraph,
  drawUndirGraph: drawUndirGraph,
  drawCondGraph: drawCondGraph,
  dfs: dfs,
  bfs : bfs,
  findComponents: findComponents,
  reachMatrix: reachMatrix,
  strongMatrix: strongMatrix,
}