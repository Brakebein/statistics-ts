"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var misc_1 = require("../misc");
var vector_1 = require("../vector");
/**
 * Normal distribution
 */
var NormalDistribution = /** @class */ (function () {
    function NormalDistribution(mean, variance) {
        this.mean = mean;
        this.variance = variance;
    }
    NormalDistribution.prototype._de = function (x) {
        return (1 / (Math.sqrt(this.variance) * (Math.sqrt(2 * Math.PI))))
            * Math.exp(-(Math.pow(x - this.mean, 2)) / (2 * this.variance));
    };
    NormalDistribution.prototype._di = function (x) {
        return 0.5 * (1 + misc_1.Misc.erf((x - this.mean) / (Math.sqrt(this.variance) * Math.sqrt(2))));
    };
    NormalDistribution.prototype.dens = function (v) {
        var _this = this;
        if (v instanceof vector_1.Vector) {
            return new vector_1.Vector(v.elements.map(function (value) { return _this._de(value); }));
        }
        else {
            return this._de(v);
        }
    };
    NormalDistribution.prototype.distr = function (v) {
        var _this = this;
        if (v instanceof vector_1.Vector) {
            return new vector_1.Vector(v.elements.map(function (value) { return _this._di(value); }));
        }
        else {
            return this._di(v);
        }
    };
    NormalDistribution.prototype.inverse = function (x) {
        var a1 = -3.969683028665376e+1;
        var a2 = 2.209460984245205e+2;
        var a3 = -2.759285104469687e+2;
        var a4 = 1.383577518672690e+2;
        var a5 = -3.066479806614716e+1;
        var a6 = 2.506628277459239e+0;
        var b1 = -5.447609879822406e+1;
        var b2 = 1.615858368580409e+2;
        var b3 = -1.556989798598866e+2;
        var b4 = 6.680131188771972e+1;
        var b5 = -1.328068155288572e+1;
        var c1 = -7.784894002430293e-3;
        var c2 = -3.223964580411365e-1;
        var c3 = -2.400758277161838e+0;
        var c4 = -2.549732539343734e+0;
        var c5 = 4.374664141464968e+0;
        var c6 = 2.938163982698783e+0;
        var d1 = 7.784695709041462e-3;
        var d2 = 3.224671290700398e-1;
        var d3 = 2.445134137142996e+0;
        var d4 = 3.754408661907416e+0;
        var q;
        var r;
        var y;
        if (x < 0.02425) {
            q = Math.sqrt(-2 * Math.log(x));
            y = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }
        else if (x < 1 - 0.02425) {
            q = x - 0.5;
            r = q * q;
            y = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q
                / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        }
        else {
            q = Math.sqrt(-2 * Math.log(1 - x));
            y = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }
        return y * this.variance + this.mean;
    };
    return NormalDistribution;
}());
exports.NormalDistribution = NormalDistribution;
