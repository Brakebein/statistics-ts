(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../numeric", "../vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var numeric_1 = require("../numeric");
    var vector_1 = require("../vector");
    /**
     * Kolmogorov distribution
     */
    var KolmogorovDistribution = /** @class */ (function () {
        function KolmogorovDistribution() {
        }
        KolmogorovDistribution.prototype._di = function (x) {
            var term;
            var sum = 0;
            var k = 1;
            do {
                term = Math.exp(-Math.pow(2 * k - 1, 2) * Math.pow(Math.PI, 2) / (8 * Math.pow(x, 2)));
                sum += term;
                k++;
            } while (Math.abs(term) > 0.000000000001);
            return Math.sqrt(2 * Math.PI) * sum / x;
        };
        KolmogorovDistribution.prototype.distr = function (v) {
            var _this = this;
            if (v instanceof vector_1.Vector) {
                return new vector_1.Vector(v.elements.map(function (value) { return _this._di(value); }));
            }
            else {
                return this._di(v);
            }
        };
        KolmogorovDistribution.prototype.inverse = function (x) {
            var _this = this;
            return numeric_1.Numeric.bisection(function (y) { return _this._di(y) - x; }, 0, 1);
        };
        return KolmogorovDistribution;
    }());
    exports.KolmogorovDistribution = KolmogorovDistribution;
});
