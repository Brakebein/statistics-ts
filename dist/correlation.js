(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./distributions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var distributions_1 = require("./distributions");
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
            var tdistr = new distributions_1.TDistribution(df);
            var p = 2 * (1 - tdistr.distr(Math.abs(t)));
            return { r: r, t: t, df: df, p: p };
        };
        return Correlation;
    }());
    exports.Correlation = Correlation;
});
