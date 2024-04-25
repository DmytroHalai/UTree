"use strict";

const bfs = (matrix, startVertex) => {
  const { length } = matrix;
  const bfsMatrix = Array.from({ length }, () => new Array(length).fill(0))
  const q = [];
  const path = [];
  const queue = new Array(length).fill(false);
  path.push(startVertex);
  q.push(startVertex);
  queue[startVertex] = true;
  while (q.length > 0) {
    const vertex = q.shift();
    for (let u = 0; u < length; u++) {
      if (matrix[vertex][u] && !queue[u]) {
        bfsMatrix[vertex][u] = 1;
        path.push(u)
        q.push(u);
        queue[u] = true;
      }
    }
  }
  return { bfsMatrix, path };
};

module.exports = { bfs };
