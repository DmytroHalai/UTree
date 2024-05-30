'use strict';

const vector = (x1, y1, x2, y2) => ({
  x: x2 - x1,
  y: y2 - y1,
});

const vectorModule = (vector) => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

const findCoord = (coords, i, action, weight, height, last) => {
  const previous = i - 1;
  action(coords, i, previous, weight, height, last);
};

const findVertexCoord = (count, x, y, ctxHeight, ctxWeight) => {
  const coords = {
    xCoord: [],
    yCoord: [],
  };
  const actions = {};

  actions[1] = (coords, i, previous, weightInterval) => {
    coords.xCoord[i] = coords.xCoord[previous] + weightInterval;
    coords.yCoord[i] = coords.yCoord[previous];
  };

  actions[2] = (coords, i, previous, weightInterval, heightInterval) => {
    coords.xCoord.push(coords.xCoord[previous]);
    coords.yCoord[i] = coords.yCoord[previous] + heightInterval;
  };

  actions[3] = (coords, i, previous, weightInterval) => {
    coords.xCoord[i] = coords.xCoord[previous] - weightInterval;
    coords.yCoord[i] = coords.yCoord[previous];
  };

  actions[4] = (
    coords,
    i,
    previous,
    weightInterval,
    heightInterval,
    lastSideInterval,
  ) => {
    coords.xCoord[i] = coords.xCoord[previous];
    coords.yCoord[i] = coords.yCoord[previous] - lastSideInterval;
  };

  const vertexesPerSide = Math.floor(count / 4); // 4 is amount of sides in rectangle
  const vertexAmount = {
    1: vertexesPerSide,
    2: vertexesPerSide,
    3: vertexesPerSide,
    4: count - vertexesPerSide * 3,
  };
  let pointer = 1;
  const heightInterval = ctxHeight / vertexesPerSide;
  const weightInterval = ctxWeight / vertexesPerSide;
  const lastSideInterval = ctxHeight / vertexAmount['4'];
  coords.xCoord[0] = x;
  coords.yCoord[0] = y;

  for (let i = 1; i < count; i++) {
    findCoord(
      coords,
      i,
      actions[pointer],
      weightInterval,
      heightInterval,
      lastSideInterval,
    );
    pointer = pointer * 3 > i ? pointer : pointer + 1;
  }

  return coords;
};

const heronsFormula = (length1, length2, length3) => {
  const p = (length1 + length2 + length3) / 2;
  return (
    Math.sqrt(p * (p - length1) * (p - length2) * (p - length3) * 2) / length1
  );
};

const lineVal = (coords, start, end, radius) => {
  const startX = coords.xCoord[start];
  const startY = coords.yCoord[start];
  const endX = coords.xCoord[end];
  const endY = coords.yCoord[end];
  const vector1 = vector(startX, startY, endX, endY);
  const vectorModule1 = vectorModule(vector1);
  let valResult = false;
  for (let k = 0; k < coords.xCoord.length; k++) {
    if (k === start || k === end) continue;
    const isNeighbourVertex = Math.abs(end - start) === 1;
    if (isNeighbourVertex) break;
    const vector2 = vector(startX, startY, coords.xCoord[k], coords.yCoord[k]);
    const vector3 = vector(coords.xCoord[k], coords.yCoord[k], endX, endY);
    const vectorModule2 = vectorModule(vector2);
    const vectorModule3 = vectorModule(vector3);
    const height = heronsFormula(vectorModule1, vectorModule2, vectorModule3);
    valResult = height < radius;
    if (valResult) break;
  }
  return valResult;
};

const calculateAngle = (coords, start, end) => {
  const startX = coords.xCoord[start];
  const startY = coords.yCoord[start];
  const endX = coords.xCoord[end];
  const endY = coords.yCoord[end];
  return Math.atan2(endY - startY, endX - startX);
};

const checkRepeat = (val, i) => {
  const start = val.start[i];
  const end = val.end[i];
  let result = true;
  const { length } = val.start;
  for (let j = 0; j < length; j++) {
    const isStitchAtStart = start === val.start[j];
    const isStitchAtEnd = end === val.end[j];
    result = !(isStitchAtStart && isStitchAtEnd && j > i);
  }
  return result;
};

module.exports = {
  vector,
  vectorModule,
  createCoordsCollection: findCoord,
  findVertexCoord,
  lineVal,
  calculateAngle,
  checkRepeat,
};
