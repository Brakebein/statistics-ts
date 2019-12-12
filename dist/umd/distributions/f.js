(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../misc", "../vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var misc_1 = require("../misc");
    var vector_1 = require("../vector");
    /**
     * F distribution
     */
    var FDistribution = /** @class */ (function () {
        function FDistribution(df1, df2) {
            this.df1 = df1;
            this.df2 = df2;
        }
        FDistribution.prototype._di = function (x) {
            return misc_1.Misc.rbeta((this.df1 * x) / (this.df1 * x + this.df2), this.df1 / 2, this.df2 / 2);
        };
        FDistribution.prototype.distr = function (v) {
            var _this = this;
            if (v instanceof vector_1.Vector) {
                return new vector_1.Vector(v.elements.map(function (value) { return _this._di(value); }));
            }
            else {
                return this._di(v);
            }
        };
        return FDistribution;
    }());
    exports.FDistribution = FDistribution;
});
