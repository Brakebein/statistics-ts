"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distributions_1 = require("./distributions");
var vector_1 = require("./vector");
var Nonparametric = /** @class */ (function () {
    function Nonparametric() {
    }
    /**
     * Two-sample Kolmogorov-Smirnov test
     */
    Nonparametric.prototype.kolmogorovSmirnov = function (x, y) {
        var all = new vector_1.Vector(x.elements.concat(y.elements)).sort();
        var ecdfx = x.ecdf(all);
        var ecdfy = y.ecdf(all);
        var d = ecdfy.subtract(ecdfx).abs().max();
        var n = (x.length() * y.length()) / (x.length() + y.length());
        var ks = Math.sqrt(n) * d;
        var p = 1 - new distributions_1.KolmogorovDistribution().distr(ks);
        return { d: d, ks: ks, p: p };
    };
    return Nonparametric;
}());
exports.Nonparametric = Nonparametric;
