import { FDistribution } from './distributions';
import { Vector } from './vector';
var Anova = /** @class */ (function () {
    function Anova() {
    }
    /**
     * One-way ANOVA
     */
    Anova.oneway = function (x, y) {
        var vectors = [];
        for (var i = 0; i < x.groups(); i++) {
            var vec = new Vector([]);
            var indices = x.group(i);
            for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                var index = indices_1[_i];
                vec.push(y.elements[index]);
            }
            vectors.push(vec);
        }
        var mean = new Vector([]);
        var n = new Vector([]);
        var v = new Vector([]);
        for (var _a = 0, vectors_1 = vectors; _a < vectors_1.length; _a++) {
            var vec = vectors_1[_a];
            mean.push(vec.mean());
            n.push(vec.length());
            v.push(vec.variance());
        }
        var tdf = x.groups() - 1;
        var tss = mean.add(-y.mean()).pow(2).multiply(n).sum();
        var tms = tss / tdf;
        var edf = x.length() - x.groups();
        var ess = v.multiply(n.add(-1)).sum();
        var ems = ess / edf;
        var f = tms / ems;
        var fdistr = new FDistribution(tdf, edf);
        var p = 1 - fdistr.distr(Math.abs(f));
        return { tdf: tdf, tss: tss, tms: tms, edf: edf, ess: ess, ems: ems, f: f, p: p };
    };
    return Anova;
}());
export { Anova };
