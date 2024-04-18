"use strict";

const vector = (x1, y1, x2, y2) => {
  const x = x2 - x1,
    y = y2 - y1;
  return {
    x: x,
    y: y,
  };
};

const vectorModule = (vector) => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

const pseudoRandom = (seed) => {
  let value = seed;

  return function () {
    value = (value * 1103515245 + 12345) % 2147483648;
    return value % 100 < 25;
  };
};

const createCoordsCollection = (
  coords,
  i,
  action,
  weightInterval,
  heightInterval,
  lastSideInterval,
) => {
  const previous = i - 1;
  action(coords, i, previous, weightInterval, heightInterval, lastSideInterval);
};

const findVertexCoord = (
  vertexCount,
  firstCoordX,
  firstCoordY,
  ctxHeight,
  ctxWeight,
) => {
  let coords = {
    xCoord: [],
    yCoord: [],
  };

  const actions = new Map([
    [
      1,
      (coords, i, previous, weightInterval) => {
        coords.xCoord[i] = coords.xCoord[previous] + weightInterval;
        coords.yCoord[i] = coords.yCoord[previous];
      },
    ],
    [
      2,
      (coords, i, previous, weightInterval, heightInterval) => {
        coords.xCoord.push(coords.xCoord[previous]);
        coords.yCoord[i] = coords.yCoord[previous] + heightInterval;
      },
    ],
    [
      3,
      (coords, i, previous, weightInterval) => {
        coords.xCoord[i] = coords.xCoord[previous] - weightInterval;
        coords.yCoord[i] = coords.yCoord[previous];
      },
    ],
    [
      4,
      (
        coords,
        i,
        previous,
        weightInterval,
        heightInterval,
        lastSideInterval,
      ) => {
        coords.xCoord[i] = coords.xCoord[previous];
        coords.yCoord[i] = coords.yCoord[previous] - lastSideInterval;
      },
    ],
  ]);

  const vertexesPerSide = Math.floor(vertexCount / 4); // 4 is amount of sides in rectangle
  const vertexAmount = {
    1: vertexesPerSide,
    2: vertexesPerSide,
    3: vertexesPerSide,
    4: vertexesPerSide + (vertexCount % vertexesPerSide),
  };
  let pointer = 1;
  const heightInterval = ctxHeight / vertexesPerSide,
    weightInterval = ctxWeight / vertexesPerSide,
    lastSideInterval = ctxHeight / vertexAmount["4"];
  coords.xCoord[0] = firstCoordX;
  coords.yCoord[0] = firstCoordY;

  for (let i = 1; i < vertexCount; i++) {
    createCoordsCollection(
      coords,
      i,
      actions.get(pointer),
      weightInterval,
      heightInterval,
      lastSideInterval,
    );
    pointer = pointer * 3 > i ? pointer : pointer + 1;
  }

  return coords;
};

const lineVal = (coords, i, j, radius) => {
  const startX = coords.xCoord[i];
  const startY = coords.yCoord[i];
  const endX = coords.xCoord[j];
  const endY = coords.yCoord[j];
  const vector1 = vector(startX, startY, endX, endY);
  const a = vectorModule(vector1);
  let valResult = null;
  for (let k = 0; k < coords.xCoord.length; k++) {
    if (k === i || k === j) continue;
    if (Math.abs(j - i) === 1) break;
    const vector2 = vector(startX, startY, coords.xCoord[k], coords.yCoord[k]);
    const vector3 = vector(coords.xCoord[k], coords.yCoord[k], endX, endY);
    const b = vectorModule(vector2);
    const c = vectorModule(vector3);
    const p = (a + b + c) / 2;
    const height = (Math.sqrt(p * (p - a) * (p - b) * (p - c)) * 2) / a;
    if (height < radius) {
      valResult = a;
      break;
    }
  }
  return valResult;
};

const calculateAngle = (coords, i, j) => {
  const startX = coords.xCoord[i];
  const startY = coords.yCoord[i];
  const endX = coords.xCoord[j];
  const endY = coords.yCoord[j];
  return Math.atan2(endY - startY, endX - startX);
};

const checkRepeat = (val, i) => {
  const startC = val.start[i],
    endC = val.end[i];
  let result = true;
  for (let j = 0; j < val.start.length; j++) {
    if (startC === val.start[j] && endC === val.end[j] && j > i) {
      result = false;
    }
  }
  return result;
};

export {
  lineVal,
  vector,
  pseudoRandom,
  checkRepeat,
  vectorModule,
  findVertexCoord,
  calculateAngle,
};
