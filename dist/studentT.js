"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distributions_1 = require("./distributions");
var vector_1 = require("./vector");
var StudentT = /** @class */ (function () {
    function StudentT() {
    }
    StudentT.test = function (first, second) {
        if (second instanceof vector_1.Vector) {
            return StudentT._twosample(first, second);
        }
        else {
            return StudentT._onesample(first, second);
        }
    };
    /**
     * two-sample Student's t-test
     */
    StudentT._twosample = function (first, second) {
        var se = Math.sqrt((first.variance() / first.length()) + (second.variance() / second.length()));
        var t = (first.mean() - second.mean()) / se;
        var df = first.length() + second.length() - 2;
        var tdistr = new distributions_1.TDistribution(df);
        var p = 2 * (1 - tdistr.distr(Math.abs(t)));
        return { se: se, t: t, df: df, p: p };
    };
    /**
     * one-sample Student's t-test
     */
    StudentT._onesample = function (sample, mu) {
        var se = Math.sqrt(sample.variance()) / Math.sqrt(sample.length());
        var t = (sample.mean() - mu) / se;
        var df = sample.length() - 1;
        var tdistr = new distributions_1.TDistribution(df);
        var p = 2 * (1 - tdistr.distr(Math.abs(t)));
        return { se: se, t: t, df: df, p: p };
    };
    return StudentT;
}());
exports.StudentT = StudentT;
