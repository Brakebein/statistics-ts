import { Misc } from '../misc';
import { Vector } from '../vector';
/**
 * F distribution
 */
var FDistribution = /** @class */ (function () {
    function FDistribution(df1, df2) {
        this.df1 = df1;
        this.df2 = df2;
    }
    FDistribution.prototype._di = function (x) {
        return Misc.rbeta((this.df1 * x) / (this.df1 * x + this.df2), this.df1 / 2, this.df2 / 2);
    };
    FDistribution.prototype.distr = function (v) {
        var _this = this;
        if (v instanceof Vector) {
            return new Vector(v.elements.map(function (value) { return _this._di(value); }));
        }
        else {
            return this._di(v);
        }
    };
    return FDistribution;
}());
export { FDistribution };
