import { Misc } from '../misc';
import { Numeric } from '../numeric';
import { Vector } from '../vector';
/**
 * T distribution
 */
var TDistribution = /** @class */ (function () {
    function TDistribution(df) {
        this.df = df;
    }
    TDistribution.prototype._de = function (x) {
        return (Misc.gamma((this.df + 1) / 2) / (Math.sqrt(this.df * Math.PI) * Misc.gamma(this.df / 2)))
            * Math.pow((1 + Math.pow(x, 2) / this.df), -(this.df + 1) / 2);
    };
    TDistribution.prototype._di = function (x) {
        if (x < 0) {
            return 0.5 * Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
        }
        else {
            return 1 - 0.5 * Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
        }
    };
    TDistribution.prototype.dens = function (v) {
        var _this = this;
        if (v instanceof Vector) {
            return new Vector(v.elements.map(function (value) { return _this._de(value); }));
        }
        else {
            return this._de(v);
        }
    };
    TDistribution.prototype.distr = function (v) {
        var _this = this;
        if (v instanceof Vector) {
            return new Vector(v.elements.map(function (value) { return _this._di(value); }));
        }
        else {
            return this._di(v);
        }
    };
    TDistribution.prototype.inverse = function (x) {
        var _this = this;
        return Numeric.bisection(function (y) { return _this._di(y) - x; }, -10.1, 10);
    };
    return TDistribution;
}());
export { TDistribution };
