"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = require("../misc");
var numeric_1 = require("../numeric");
var vector_1 = require("../vector");
/**
 * T distribution
 */
var TDistribution = /** @class */ (function () {
    function TDistribution(df) {
        this.df = df;
    }
    TDistribution.prototype._de = function (x) {
        return (misc_1.Misc.gamma((this.df + 1) / 2) / (Math.sqrt(this.df * Math.PI) * misc_1.Misc.gamma(this.df / 2)))
            * Math.pow((1 + Math.pow(x, 2) / this.df), -(this.df + 1) / 2);
    };
    TDistribution.prototype._di = function (x) {
        if (x < 0) {
            return 0.5 * misc_1.Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
        }
        else {
            return 1 - 0.5 * misc_1.Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
        }
    };
    TDistribution.prototype.dens = function (v) {
        var _this = this;
        if (v instanceof vector_1.Vector) {
            return new vector_1.Vector(v.elements.map(function (value) { return _this._de(value); }));
        }
        else {
            return this._de(v);
        }
    };
    TDistribution.prototype.distr = function (v) {
        var _this = this;
        if (v instanceof vector_1.Vector) {
            return new vector_1.Vector(v.elements.map(function (value) { return _this._di(value); }));
        }
        else {
            return this._di(v);
        }
    };
    TDistribution.prototype.inverse = function (x) {
        var _this = this;
        return numeric_1.Numeric.bisection(function (y) { return _this._di(y) - x; }, -10.1, 10);
    };
    return TDistribution;
}());
exports.TDistribution = TDistribution;
