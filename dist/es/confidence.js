import { TDistribution } from './distributions';
var Confidence = /** @class */ (function () {
    function Confidence() {
    }
    Confidence.normal = function (x, c) {
        var alpha = 1 - c;
        var t = new TDistribution(x.length() - 1);
        var lower = x.mean() - t.inverse(1 - alpha / 2) * x.sem();
        var upper = x.mean() + t.inverse(1 - alpha / 2) * x.sem();
        return [lower, upper];
    };
    Confidence.normalUpper = function (x, c) {
        var alpha = 1 - c;
        var t = new TDistribution(x.length() - 1);
        return x.mean() + t.inverse(1 - alpha) * x.sem();
    };
    Confidence.normalLower = function (x, c) {
        var alpha = 1 - c;
        var t = new TDistribution(x.length() - 1);
        return x.mean() - t.inverse(1 - alpha) * x.sem();
    };
    return Confidence;
}());
export { Confidence };
