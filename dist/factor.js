(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Factor = /** @class */ (function () {
        function Factor(elements) {
            var _this = this;
            this.levels = [];
            this.factors = [];
            elements.forEach(function (value) {
                var index = _this.levels.indexOf(value);
                if (index !== -1) {
                    _this.factors.push(index);
                }
                else {
                    _this.factors.push(_this.levels.length);
                    _this.levels.push(value);
                }
            });
        }
        Factor.prototype.group = function (g) {
            var indices = [];
            var i = -1;
            // tslint:disable-next-line:no-conditional-assignment
            while ((i = this.factors.indexOf(g, i + 1)) !== -1) {
                indices.push(i);
            }
            return indices;
        };
        Factor.prototype.length = function () {
            return this.factors.length;
        };
        Factor.prototype.groups = function () {
            return this.levels.length;
        };
        return Factor;
    }());
    exports.Factor = Factor;
});
