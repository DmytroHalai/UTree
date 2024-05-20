'use strict';

/**
 * This method makes a trace of your graph.
 * @param matrix Adjacency matrix.
 * @param startVertex The vertex trace will be started at.
 * @returns {{path: *[], bfsMatrix: any[][]}} The path of the tracing and bfs matrix.
 */
const bfs = (matrix, startVertex = 0) => {
  const { length } = matrix;
  const bfsMatrix = Array.from({ length }, () => new Array(length).fill(0));
  const q = [];
  const path = [];
  const visited = new Array(length).fill(false);
  path.push(startVertex);
  q.push(startVertex);
  visited[startVertex] = true;
  while (q.length > 0) {
    const vertex = q.shift();
    for (let u = 0; u < length; u++) {
      const hasConnect = matrix[vertex][u] === 1;
      if (hasConnect && !visited[u]) {
        bfsMatrix[vertex][u] = 1;
        path.push(u);
        q.push(u);
        visited[u] = true;
      }
    }
  }
  return { bfsMatrix, path };
};

module.exports = { bfs };
