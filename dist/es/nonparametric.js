import { KolmogorovDistribution } from './distributions';
import { Vector } from './vector';
var Nonparametric = /** @class */ (function () {
    function Nonparametric() {
    }
    /**
     * Two-sample Kolmogorov-Smirnov test
     */
    Nonparametric.prototype.kolmogorovSmirnov = function (x, y) {
        var all = new Vector(x.elements.concat(y.elements)).sort();
        var ecdfx = x.ecdf(all);
        var ecdfy = y.ecdf(all);
        var d = ecdfy.subtract(ecdfx).abs().max();
        var n = (x.length() * y.length()) / (x.length() + y.length());
        var ks = Math.sqrt(n) * d;
        var p = 1 - new KolmogorovDistribution().distr(ks);
        return { d: d, ks: ks, p: p };
    };
    return Nonparametric;
}());
export { Nonparametric };
