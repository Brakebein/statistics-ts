import { TDistribution } from './distributions';
var Correlation = /** @class */ (function () {
    function Correlation() {
    }
    /**
     * Pearson correlation
     */
    Correlation.pearson = function (x, y) {
        var n = x.length();
        var mx = x.mean();
        var my = y.mean();
        var r = x.add(-mx).multiply(y.add(-my)).sum() / Math.sqrt(x.add(-mx).pow(2).sum() * y.add(-my).pow(2).sum());
        var t = r * Math.sqrt((n - 2) / (1 - Math.pow(r, 2)));
        var df = n - 2;
        var tdistr = new TDistribution(df);
        var p = 2 * (1 - tdistr.distr(Math.abs(t)));
        return { r: r, t: t, df: df, p: p };
    };
    return Correlation;
}());
export { Correlation };
