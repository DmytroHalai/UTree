"use strict";

import { convertMatrixToString, reachMatrix, strongMatrix } from "./matrix.js";

const findComponents = (matrix) => {
  const result = {};
  const valueToIndexMap = {};
  let indexCounter = 1;
  const strongMatrixConverted = convertMatrixToString(
    strongMatrix(reachMatrix(matrix)),
  );

  Object.entries(strongMatrixConverted).forEach(([key, value]) => {
    if (!valueToIndexMap[value]) {
      valueToIndexMap[value] = indexCounter;
      result[indexCounter] = [key];
      indexCounter++;
    } else {
      result[valueToIndexMap[value]].push(key);
    }
  });

  return result;
};

export { findComponents };
