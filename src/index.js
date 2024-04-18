'use strict'

import {bfs} from "./utility/graphTrace/bfsMethod.js";
import {dfs} from "./utility/graphTrace/dfsMethod.js";
import {findComponents} from "./utility/findComponents.js";
import {drawDirGraph, drawUndirGraph, drawCondGraph} from "./utility/drawGraphs.js";
import {vertexesPower} from "./utility/vertexPower.js";
import {isRegular} from "./utility/graphRegularity.js";
import {isolVertex,hangVertex} from "./utility/findIsolatedVertexes.js";
import {findWays2, findWays3} from "./utility/graphWays.js";

class UTree {

    constructor() {}

    /**
     * This method makes startVertex trace around the graph be the DFS-method
     * @param {[[]]} matrix Adjacency matrix of the graph.
     * @param {number} startVertex The vertex, from which the tracing will be started
     * @returns {Object} Array
     * of the numbers under which vertexes were checked and adjacency matrix of the graph after tracing
     */
    dfs(matrix, startVertex) {
        return dfs(matrix, startVertex);
    }

    /**
     * This method makes startVertex trace around the graph be the DFS-method
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @param {number} startVertex The vertex, from which the tracing will be started
     * @returns {Object} Array
     * of the numbers under which vertexes were checked and adjacency matrix of the graph after tracing
     */
    bfs(matrix, startVertex) {
        return bfs(matrix, startVertex);
    }

    /**
     * This method finds components of the graph
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @returns {Object} The object, which consists of the arrays
     */
    findComponents(matrix) {
        return findComponents(matrix);
    }

    /**
     * This method draws directed graph
     * @param {number} x The X-coordinate of the start of drawing
     * @param {number} y The X-coordinate of the start of drawing
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @param {context} ctx Canvas 2d context
     * @param {number} radius Radius of the vertexes
     */
    drawDirGraph(x, y, matrix, ctx, radius) {
            return drawDirGraph(x, y, matrix, ctx, radius);
    }

    /**
     * This method draws directed graph
     * @param {number} x The X-coordinate of the start of drawing
     * @param {number} y The X-coordinate of the start of drawing
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @param {context} ctx Canvas 2d context
     * @param {number} radius Radius of the vertexes
     */
    drawUndirGraph(x, y, matrix, ctx, radius) {
        return drawUndirGraph(x, y, matrix, ctx, radius)
    }

    /**
     * This method draws condensation graph of your graph
     * @param {number} x The X-coordinate of the start of drawing
     * @param {number} y The X-coordinate of the start of drawing
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @param {context} ctx Canvas 2d context
     * @param {number} radius Radius of the vertexes
     */
    drawCondGraph(x, y, matrix, ctx, radius) {
        return drawCondGraph(x, y, matrix, ctx, radius);
    }

    /**
     *This method finds powers of vertexes.
     * @param {[[]]} matrix Adjacency matrix of the graph
     * @returns {{dir: [], undir: [], dirEnter: [], dirExit: [], }} an object
     * which fields are arrays of powers for each vertex.
     */
    vertexesPower(matrix) {
        return vertexesPower(matrix);
    }

    /**
     * This method checks if the graph is regular.
     * @param {[[]]} matrix Adjacency matrix of the graph.
     * @returns {boolean} true if graph is regular and false if not
     */
    isRegular(matrix) {
        return isRegular(matrix);
    }

    /**
     * This method finds isolated vertexes in the graph
     * @param {[[]]} matrix Adjacency matrix of the graph.
     * @returns {[]} array of isolated vertexes
     */
    isolVertex(matrix) {
        return isolVertex(matrix);
    }

    /**
     * This method finds hanged vertexes in the graph
     * @param {[[]]} matrix Adjacency matrix of the graph.
     * @returns {[]} array of hanged vertexes
     */
    hangVertex(matrix) {
        return hangVertex(matrix);
    }

    /**
     * This method finds ways in the graph
     * @param {[[]]} matrix Adjacency matrix of the graph.
     * @param {number} power Equals 2 to find ways length 2 or 3 to find ways length 3
     * @returns {[]} array of the whole ways of the chosen length
     */
    findWay(matrix, power) {
        switch (power){
            case 2: return findWays2(matrix);
            case 3: return findWays3(matrix);
        }
    }
}

export default UTree;