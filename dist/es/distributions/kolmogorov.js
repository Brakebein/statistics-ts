import { Numeric } from '../numeric';
import { Vector } from '../vector';
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
        if (v instanceof Vector) {
            return new Vector(v.elements.map(function (value) { return _this._di(value); }));
        }
        else {
            return this._di(v);
        }
    };
    KolmogorovDistribution.prototype.inverse = function (x) {
        var _this = this;
        return Numeric.bisection(function (y) { return _this._di(y) - x; }, 0, 1);
    };
    return KolmogorovDistribution;
}());
export { KolmogorovDistribution };
