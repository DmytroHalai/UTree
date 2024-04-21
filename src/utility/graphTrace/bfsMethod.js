"use strict";

const bfs = (matrix, a) => {
  const { length } = matrix;
  const bfsMatrix = Array.from({ length}, () => new Array(length).fill(0))
  const q = [];
  const path = new Array(length).fill(false);
  path[a] = true;
  q.push(a);
  while (q.length) {
    const vertex = q.at(0);
    for (let u = 0; u < length; u++) {
      if (matrix[vertex][u] && !path[u]) {
        bfsMatrix[vertex][u] = 1;
        path.push(u)
        q.push(u);
      }
    }
  }
  return { bfsMatrix, checkNumbers: path };
};

export { bfs };
