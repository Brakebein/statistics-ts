(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./anova", "./confidence", "./correlation", "./distributions", "./factor", "./matrix", "./misc", "./nonparametric", "./normality", "./numeric", "./power", "./regression", "./sequence", "./studentT", "./vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(require("./anova"));
    __export(require("./confidence"));
    __export(require("./correlation"));
    __export(require("./distributions"));
    __export(require("./factor"));
    __export(require("./matrix"));
    __export(require("./misc"));
    __export(require("./nonparametric"));
    __export(require("./normality"));
    __export(require("./numeric"));
    __export(require("./power"));
    __export(require("./regression"));
    __export(require("./sequence"));
    __export(require("./studentT"));
    __export(require("./vector"));
});
