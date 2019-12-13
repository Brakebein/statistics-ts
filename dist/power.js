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
    var Power = /** @class */ (function () {
        function Power() {
        }
        /**
         * Sample size calculation
         */
        Power.sampleSize = function (a, power, sd, effect) {
            var n = new distributions_1.NormalDistribution(0, 1);
            return (2 * Math.pow(n.inverse(1 - a / 2) + n.inverse(power), 2) * Math.pow(sd, 2)) / Math.pow(effect, 2);
        };
        return Power;
    }());
    exports.Power = Power;
});
