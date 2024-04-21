"use strict";

import { createDirMatrix } from "./src/utility/matrix.js";
import UTree from "./src/index.js";

const lib = new UTree();
const matrix = createDirMatrix(9);
const a = lib.dfs(matrix, 0);
console.table(a.checkNumbers);
console.log(0 === 0);
