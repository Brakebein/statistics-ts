import { TDistribution } from './distributions';
var Regression = /** @class */ (function () {
    function Regression() {
    }
    /**
     * simple linear regression
     */
    Regression.linear = function (x, y) {
        var n = x.length();
        // means
        var mx = x.mean();
        var my = y.mean();
        // parameters
        var rx = x.add(-mx);
        var ry = y.add(-my);
        var ssxx = rx.pow(2).sum();
        var ssyy = ry.pow(2).sum();
        var ssxy = rx.multiply(ry).sum();
        var slope = ssxy / ssxx;
        var intercept = my - slope * mx;
        // sum of squared residuals
        var ssr = y.add(x.multiply(slope).add(intercept).multiply(-1)).pow(2).sum();
        // residual standard error
        var rse = Math.sqrt(ssr / (n - 2));
        // slope
        var tdistr = new TDistribution(n - 2);
        var slope_se = rse / Math.sqrt(ssxx);
        var slope_t = slope / slope_se;
        var slope_p = 2 * (1 - tdistr.distr(Math.abs(slope_t)));
        // intercept
        var intercept_se = rse / Math.sqrt(ssxx) / Math.sqrt(n) * Math.sqrt(x.pow(2).sum());
        var intercept_t = intercept / intercept_se;
        var intercept_p = 2 * (1 - tdistr.distr(Math.abs(intercept_t)));
        // R-squared
        var rs = Math.pow(ssxy, 2) / (ssxx * ssyy);
        return { n: n, slope: slope, intercept: intercept, rse: rse, slope_se: slope_se, slope_t: slope_t, slope_p: slope_p, intercept_se: intercept_se, intercept_t: intercept_t, intercept_p: intercept_p, rs: rs };
    };
    return Regression;
}());
export { Regression };
