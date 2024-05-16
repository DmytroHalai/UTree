'use strict';

/**
 * This method makes startVertex trace around the graph be the DFS-method.
 * @param {[[]]} matrix Adjacency matrix of the graph.
 * @param {number} startVertex The vertex, from which the tracing will be started.
 * @returns {Object} The result of tracing and dfs matrix.
 * of the numbers under which vertexes were checked and adjacency matrix of the graph after tracing.
 */
const dfs = (matrix, startVertex) => {
  const { length } = matrix;
  const visited = new Array(length).fill(false);
  const stack = [startVertex];
  const path = [startVertex];
  const dfsMatrix = Array.from({ length }, () => new Array(length).fill(0));
  let returns = false;
  visited[startVertex] = true;
  while (stack.length) {
    const last = -1;
    const vertex = stack.at(last);
    if (returns) path.push(vertex);
    let flag = false;
    for (let i = 0; i < length; i++) {
      const hasConnect = matrix[vertex][i] === 1;
      if (!hasConnect || visited[i]) continue;
      returns = false;
      stack.push(i);
      path.push(i);
      dfsMatrix[vertex][i] = 1;
      flag = true;
      visited[i] = true;
      break;
    }
    if (!flag) {
      stack.pop();
      returns = true;
    }
  }
  return { path, dfsMatrix };
};

module.exports = { dfs };
