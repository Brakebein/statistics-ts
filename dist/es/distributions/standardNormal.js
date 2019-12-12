var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NormalDistribution } from './normal';
/**
 * Standard Normal Distribution
 */
var StandardNormalDistribution = /** @class */ (function (_super) {
    __extends(StandardNormalDistribution, _super);
    function StandardNormalDistribution() {
        return _super.call(this, 0, 1) || this;
    }
    return StandardNormalDistribution;
}(NormalDistribution));
export { StandardNormalDistribution };
