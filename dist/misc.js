"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decimal_js_1 = require("decimal.js");
var numeric_1 = require("./numeric");
var Misc = /** @class */ (function () {
    function Misc() {
    }
    /**
     * error function
     */
    Misc.erf = function (z) {
        var term;
        var sum = 0;
        var n = 0;
        do {
            term = Math.pow(-1, n) * Math.pow(z, 2 * n + 1) / Misc.fac(n) / (2 * n + 1);
            sum += term;
            n++;
        } while (Math.abs(term) > 0.000000000001);
        return sum * 2 / Math.sqrt(Math.PI);
    };
    /**
     * gamma function
     */
    Misc.gamma = function (n) {
        var p = [
            0.99999999999980993,
            676.5203681218851,
            -1259.1392167224028,
            771.32342877765313,
            -176.61502916214059,
            12.507343278686905,
            -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7
        ];
        var g = 7;
        if (n < 0.5) {
            return new decimal_js_1.Decimal(Math.PI / Math.sin(Math.PI * n)).mul(Misc.gamma(1 - n));
            // return Math.PI / Math.sin(Math.PI * n) * this.gamma(1 - n);
        }
        n -= 1;
        var t = n + g + 0.5;
        var a = p[0];
        for (var i = 1; i < p.length; i++) {
            a += p[i] / (n + i);
        }
        var powN = new decimal_js_1.Decimal(t).pow(n + 0.5);
        var powE = new decimal_js_1.Decimal(Math.E).pow(-t);
        return new decimal_js_1.Decimal(Math.sqrt(2 * Math.PI)).mul(powN).mul(powE).mul(a);
        // return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * a;
    };
    /**
     * beta function
     */
    Misc.beta = function (x, y) {
        // return Misc.gamma(x) * Misc.gamma(y) / Misc.gamma(x + y);
        return Misc.gamma(x).mul(Misc.gamma(y)).div(Misc.gamma(x + y)).toNumber();
    };
    /**
     * incomplete beta function
     */
    Misc.ibeta = function (x, a, b) {
        return numeric_1.Numeric.adaptiveSimpson(function (y) { return Math.pow(y, a - 1) * Math.pow(1 - y, b - 1); }, 0, x, 0.000000000001, 10);
    };
    /**
     * regularized incomplete beta function
     */
    Misc.rbeta = function (x, a, b) {
        return this.ibeta(x, a, b) / this.beta(a, b);
    };
    /**
     * factorial
     */
    Misc.fac = function (n) {
        var result = 1;
        for (var i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };
    return Misc;
}());
exports.Misc = Misc;
