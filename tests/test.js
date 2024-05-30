'use strict';

const test = require('node:test');
const assert = require('node:assert').strict;
const lib = require('../src');
const { compareMatrix, compareArray } = require('./testUtils.js');
const {
  powerMatrix,
  undirMatrix,
  convertMatrixToString,
} = require('../src/matrix.js');
const { transMatrix } = require('../src');

test('Matrix multiplication', async (t) => {
  await t.test('matrix multiplication', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrix2 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const matrixResult = [
      [30, 36, 42],
      [66, 81, 96],
      [102, 126, 150],
    ];
    const mult = lib.multMatrix(matrix, matrix2);
    assert.ok(
      compareMatrix(mult, matrixResult),
      'Matrix multiplication works not correct',
    );
  });

  await t.test('negative matrix multiplication', (test) => {
    const matrix = [
      [-2, 13, -11],
      [-22, 17, -1],
      [-14, -28, 9],
    ];
    const matrix2 = [
      [2, 3, -222],
      [22, -17, -11],
      [-4, 2, 99],
    ];
    const matrixResult = [
      [326, -249, -788],
      [334, -357, 4598],
      [-680, 452, 4307],
    ];
    const mult = lib.multMatrix(matrix, matrix2);
    assert.ok(
      compareMatrix(mult, matrixResult),
      'Negative matrix multiplication works not correct',
    );
  });

  await t.test('zero matrix multiplication', (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const matrix2 = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const matrixResult = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const mult = lib.multMatrix(matrix, matrix2);
    assert.ok(
      compareMatrix(mult, matrixResult),
      'Zero matrix multiplication works not correct',
    );
  });
});

test('Undir matrix', async (t) => {
  await t.test('normal matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 1],
      [1, 1, 0],
      [0, 1, 0],
    ];
    const result = [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
    ];
    const undir = undirMatrix(matrix);
    assert.ok(compareMatrix(undir, result), 'Undir matrix works not correct');
  });

  await t.test('zero matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const undir = undirMatrix(matrix);
    assert.ok(compareMatrix(undir, matrix), 'Undir matrix works not correct');
  });
});

test('Finding reach matrix', async (t) => {
  await t.test('all vertexes connected', async (test) => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const reach = lib.reachMatrix(matrix);
    assert.ok(
      compareMatrix(reach, result),
      'finding reach matrix for graph where all the vertexes are connected does not work',
    );
  });

  await t.test('zero connections graph', async (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const undir = lib.reachMatrix(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'finding reach matrix for graph where no connections does not work',
    );
  });
});

test('Trans matrix', async (t) => {
  await t.test('normal matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 1],
      [1, 1, 0],
      [0, 1, 0],
    ];
    const result = [
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
    ];
    const undir = transMatrix(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'trans normal matrix works not correct',
    );
  });

  await t.test('zero matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const undir = undirMatrix(matrix);
    assert.ok(
      compareMatrix(undir, matrix),
      'trans zero matrix works not correct',
    );
  });
});

test('Finding strong matrix', async (t) => {
  await t.test('normal matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 1],
      [1, 1, 0],
      [0, 1, 0],
    ];
    const result = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const undir = lib.strongMatrix(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'finding strong matrix for graph with few connections works not correct',
    );
  });

  await t.test('zero matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const undir = lib.strongMatrix(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'finding strong matrix for graph with no connections works not correct',
    );
  });
});

test('Converting rows to strings in matrix', async (t) => {
  await t.test('normal matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 1],
      [1, 1, 0],
      [0, 1, 0],
    ];
    const result = ['001', '110', '010'];
    const undir = convertMatrixToString(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'finding strong matrix for graph with few connections works not correct',
    );
  });

  await t.test('zero matrix 3x3', async (test) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = ['000', '000', '000'];
    const undir = convertMatrixToString(matrix);
    assert.ok(
      compareMatrix(undir, result),
      'finding strong matrix for graph with no connections works not correct',
    );
  });
});

test('Making matrix to power', async (t) => {
  await t.test('zero matrix, power 32', async (powersTest) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const powerMat = powerMatrix(matrix, 32);
    assert.ok(
      compareMatrix(matrix, powerMat),
      'Zero matrix multiplication works not correct',
    );
  });

  await t.test('normal matrix 3x3, power 2', async (powersTest) => {
    const matrix = [
      [12, 3, 6],
      [11, 9, 2],
      [0, 22, -21],
    ];
    const result = [
      [177, 195, -48],
      [231, 158, 42],
      [242, -264, 485],
    ];
    const powerMat = powerMatrix(matrix, 2);
    assert.ok(
      compareMatrix(result, powerMat),
      'Zero matrix multiplication works not correct',
    );
  });

  await t.test('normal matrix 3x3, zero power', async (powersTest) => {
    const matrix = [
      [12, 3, 6],
      [11, 9, 2],
      [0, 22, -21],
    ];
    const result = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const powerMat = powerMatrix(matrix, 0);
    assert.ok(
      compareMatrix(result, powerMat),
      'Zero matrix multiplication works not correct',
    );
  });
});

test('Vertex power finding', async (t) => {
  await t.test('zero adjacency matrix', async (powersTest) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [0, 0, 0];
    const powers = lib.vertexesPower(matrix);
    const isDirPowersEqual = compareArray(result, powers.dir);
    const isUndirPowersEqual = compareArray(result, powers.undir);
    const isDirEnterPowersEqual = compareArray(result, powers.dirEnter);
    const isDirExitPowersEqual = compareArray(result, powers.dirExit);

    await powersTest.test('directed power', () => {
      assert.ok(
        isDirPowersEqual,
        'directed power for vertexes in zero connection graph does not work',
      );
    });

    await powersTest.test('undirected power', () => {
      assert.ok(
        isUndirPowersEqual,
        'undirected power for vertexes in zero connection graph does not work',
      );
    });

    await powersTest.test('directed enter power', () => {
      assert.ok(
        isDirEnterPowersEqual,
        'directed enter power for vertexes in zero connection graph does not work',
      );
    });

    await powersTest.test('directed exit power', () => {
      assert.ok(
        isDirExitPowersEqual,
        'directed exit power for vertexes in zero connection graph does not work',
      );
    });
  });

  await t.test('normal adjacency matrix', async (powersTest) => {
    const matrix = [
      [1, 1, 0],
      [0, 0, 1],
      [0, 1, 0],
    ];
    const dirResult = [3, 2, 1];
    const undirResult = [3, 1, 1];
    const dirEnterResult = [1, 2, 1];
    const dirExitResult = [2, 1, 1];
    const powers = lib.vertexesPower(matrix);
    const isDirPowersEqual = compareArray(dirResult, powers.dir);
    const isUndirPowersEqual = compareArray(undirResult, powers.undir);
    const isDirEnterPowersEqual = compareArray(dirEnterResult, powers.dirEnter);
    const isDirExitPowersEqual = compareArray(dirExitResult, powers.dirExit);

    await powersTest.test('directed power', () => {
      assert.ok(
        isDirPowersEqual,
        'directed power for vertexes in normal connection graph does not work',
      );
    });

    await powersTest.test('undirected power', () => {
      assert.ok(
        isUndirPowersEqual,
        'undirected power for vertexes in normal connection graph does not work',
      );
    });

    await powersTest.test('directed enter power', () => {
      assert.ok(
        isDirEnterPowersEqual,
        'directed enter power for vertexes in normal connection graph does not work',
      );
    });

    await powersTest.test('directed exit power', () => {
      assert.ok(
        isDirExitPowersEqual,
        'directed exit power for vertexes in normal connection graph does not work',
      );
    });
  });
});

test('Bfs graph tracing', async (t) => {
  await t.test('normal adjacency matrix', async (traceTest) => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const startVertex = 0;
    const trace = lib.bfs(matrix, startVertex);
    const pathResult = [0, 1, 2];
    const bfsMatrixResult = [
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ];
    const isTraceEqual = compareArray(pathResult, trace.path);
    const isMatrixEqual = compareMatrix(bfsMatrixResult, trace.bfsMatrix);

    await traceTest.test('trace', () => {
      assert.ok(
        isTraceEqual,
        'trace for vertexes in normal connection graph does not work',
      );
    });

    await traceTest.test('bfs matrix', () => {
      assert.ok(
        isMatrixEqual,
        'bfs matrix for vertexes in normal connection graph does not work',
      );
    });
  });

  await t.test('zero adjacency matrix', async (traceTest) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const startVertex = 0;
    const trace = lib.bfs(matrix, startVertex);
    const pathResult = [0];
    const bfsMatrixResult = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const isTraceEqual = compareArray(pathResult, trace.path);
    const isMatrixEqual = compareMatrix(bfsMatrixResult, trace.bfsMatrix);

    await traceTest.test('trace', () => {
      assert.ok(
        isTraceEqual,
        'trace for vertexes in zero connection graph does not work',
      );
    });

    await traceTest.test('bfs matrix', () => {
      assert.ok(
        isMatrixEqual,
        'bfs matrix for vertexes in zero connection graph does not work',
      );
    });
  });
});

test('Dfs graph tracing', async (t) => {
  await t.test('normal adjacency matrix', async (traceTest) => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const startVertex = 0;
    const trace = lib.bfs(matrix, startVertex);
    const pathResult = [0, 1, 2];
    const bfsMatrixResult = [
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ];
    const isTraceEqual = compareArray(pathResult, trace.path);
    const isMatrixEqual = compareMatrix(bfsMatrixResult, trace.bfsMatrix);

    await traceTest.test('trace', () => {
      assert.ok(
        isTraceEqual,
        'trace for vertexes in normal connection graph does not work',
      );
    });

    await traceTest.test('bfs matrix', () => {
      assert.ok(
        isMatrixEqual,
        'bfs matrix for vertexes in normal connection graph does not work',
      );
    });
  });

  await t.test('zero adjacency matrix', async (traceTest) => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const startVertex = 0;
    const trace = lib.dfs(matrix, startVertex);
    const pathResult = [0];
    const bfsMatrixResult = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const isTraceEqual = compareArray(pathResult, trace.path);
    const isMatrixEqual = compareMatrix(bfsMatrixResult, trace.dfsMatrix);

    await traceTest.test('trace', () => {
      assert.ok(
        isTraceEqual,
        'trace for vertexes in zero connection graph does not work',
      );
    });

    await traceTest.test('bfs matrix', () => {
      assert.ok(
        isMatrixEqual,
        'bfs matrix for vertexes in zero connection graph does not work',
      );
    });
  });
});

test('Components finding', async (t) => {
  await t.test('zero adjacency matrix', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = '{"1":["0"],"2":["1"],"3":["2"]}';
    const components = lib.findComponents(matrix);
    const areEqual = result === JSON.stringify(components);
    assert.ok(
      areEqual,
      'finding components in zero connection graph does not work correct',
    );
  });

  await t.test('one component', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = '{"1":["0","1","2"]}';
    const components = lib.findComponents(matrix);
    const areEqual = result === JSON.stringify(components);
    assert.ok(
      areEqual,
      'finding components in graph where all the vertexes are connected does not work correct',
    );
  });

  await t.test('two components', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ];
    const result = '{"1":["0","1"],"2":["2"]}';
    const components = lib.findComponents(matrix);
    const areEqual = result === JSON.stringify(components);
    assert.ok(
      areEqual,
      'finding components in graph where are two components does not work correct',
    );
  });
});

test('Isolated vertexes finding', async (t) => {
  await t.test('all vertexes isolated', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [1, 2, 3];
    const isolVertex = lib.isolVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding isolated vertexes in zero connection graph does not work correct',
    );
  });

  await t.test('all vertexes connected', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = [];
    const isolVertex = lib.isolVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding isolated vertexes in all vertexes connection graph does not work correct',
    );
  });

  await t.test('some isolated vertexes', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const result = [3];
    const isolVertex = lib.isolVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding isolated vertexes in graph where some vertexes isolated does not work correct',
    );
  });
});

test('Hanged vertexes finding', async (t) => {
  await t.test('all vertexes hanged', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [];
    const isolVertex = lib.hangVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding hanged vertexes in zero connection graph does not work correct',
    );
  });

  await t.test('all vertexes connected', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = [];
    const isolVertex = lib.hangVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding hanged vertexes in all vertexes connection graph does not work correct',
    );
  });

  await t.test('some hanged vertexes', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const result = [];
    const isolVertex = lib.hangVertex(matrix);
    assert.ok(
      compareArray(result, isolVertex),
      'finding hanged vertexes in graph where some vertexes isolated does not work correct',
    );
  });
});

test('Graph regularity', async (t) => {
  await t.test('zero connection graph', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const isRegular = lib.isRegular(matrix);
    assert.ok(
      isRegular,
      'checking regularity in zero connection graph does not work correct',
    );
  });

  await t.test('all the vertexes are connected', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const isRegular = lib.isRegular(matrix);
    assert.ok(
      isRegular,
      'checking regularity in graph where all the vertexes are connected does not work correct',
    );
  });

  await t.test('one vertex is isolated', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const isRegular = lib.isRegular(matrix);
    assert.ok(
      !isRegular,
      'checking regularity in graph where one of the vertexes is isolated does not work correct',
    );
  });

  await t.test('all the connection are occurred', () => {
    const matrix = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    const isRegular = lib.isRegular(matrix);
    assert.ok(
      isRegular,
      'checking regularity in graph where all the connections are occurred does not work correct',
    );
  });
});

test('Graph ways length 2', async (t) => {
  await t.test('zero connection graph', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [];
    const ways = lib.findWay(matrix, 2);
    const areEqual = compareArray(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 2 in zero connection graph does not work correct',
    );
  });

  await t.test('all the vertexes are connected', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = [
      [1, 2, 3],
      [2, 3, 1],
      [3, 1, 2],
    ];
    const ways = lib.findWay(matrix, 2);
    const areEqual = compareMatrix(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 2 in graph where all the vertexes are connected does not work correct',
    );
  });

  await t.test('one vertex is isolated', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const result = [
      [1, 2, 1],
      [1, 1, 2],
      [1, 2, 2],
      [2, 1, 1],
      [2, 2, 1],
      [2, 1, 2],
    ];
    const ways = lib.findWay(matrix, 2);
    const areEqual = compareMatrix(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 2 in graph where one of the vertexes is isolated does not work correct',
    );
  });
});

test('Graph ways length 3', async (t) => {
  await t.test('zero connection graph', () => {
    const matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = [];
    const ways = lib.findWay(matrix, 3);
    const areEqual = compareArray(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 3 in zero connection graph does not work correct',
    );
  });

  await t.test('all the vertexes are connected', () => {
    const matrix = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ];
    const result = [
      [1, 2, 3, 1],
      [2, 3, 1, 2],
      [3, 1, 2, 3],
    ];
    const ways = lib.findWay(matrix, 3);
    const areEqual = compareMatrix(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 3 in graph where all the vertexes are connected does not work correct',
    );
  });

  await t.test('one vertex is isolated', () => {
    const matrix = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const result = [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 1, 2, 2],
      [1, 2, 1, 2],
      [2, 1, 2, 1],
      [2, 2, 1, 1],
      [2, 1, 2, 2],
      [2, 2, 1, 2],
    ];
    const ways = lib.findWay(matrix, 3);
    const areEqual = compareMatrix(result, ways);
    assert.ok(
      areEqual,
      'finding ways length 3 in graph where one of the vertexes is isolated does not work correct',
    );
  });
});
