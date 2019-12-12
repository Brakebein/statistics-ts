import { NormalDistribution } from './distributions';
var Power = /** @class */ (function () {
    function Power() {
    }
    /**
     * Sample size calculation
     */
    Power.sampleSize = function (a, power, sd, effect) {
        var n = new NormalDistribution(0, 1);
        return (2 * Math.pow(n.inverse(1 - a / 2) + n.inverse(power), 2) * Math.pow(sd, 2)) / Math.pow(effect, 2);
    };
    return Power;
}());
export { Power };
