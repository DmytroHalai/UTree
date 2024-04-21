"use strict";

const dfs = (matrix, start) => {
  const { length } = matrix;
  const visited = new Array(length).fill(false);
  const stack = [start];
  const path = [start];
  const dfsMatrix = Array.from({length}, () => new Array(length).fill(0));
  let returns = false;
  visited[start] = true;
  while (stack.length) {
    const vertex = stack.at(-1);
    if (returns) path.push(vertex);
    let flag = false;
    for (let i = 0; i < length; i++) {
      if (!matrix[vertex][i] || visited[i]) continue;
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


export { dfs };
