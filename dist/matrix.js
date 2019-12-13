"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
    function Matrix(elements) {
        this.elements = elements;
    }
    Matrix.prototype.rows = function () {
        return this.elements.length;
    };
    Matrix.prototype.cols = function () {
        return this.elements[0].length;
    };
    Matrix.prototype.dot = function (mat) {
        var result = [];
        for (var i = 0, l = this.rows(); i < l; i++) {
            result.push([]);
            for (var j = 0, m = mat.cols(); j < m; j++) {
                var sum = 0;
                for (var k = 0, n = this.cols(); k < n; k++) {
                    sum += this.elements[i][k] * mat.elements[k][j];
                }
                result[i].push(sum);
            }
        }
        return new Matrix(result);
    };
    return Matrix;
}());
exports.Matrix = Matrix;
