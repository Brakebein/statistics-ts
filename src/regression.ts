import {TDistribution} from './distributions';
import {Vector} from './vector';

export class Regression {

  /**
   * simple linear regression
   */
  static linear(x: Vector, y: Vector) {
    const n = x.length();

    // means
    const mx = x.mean();
    const my = y.mean();

    // parameters
    const rx = x.add(-mx);
    const ry = y.add(-my);

    const ssxx = rx.pow(2).sum();
    const ssyy = ry.pow(2).sum();
    const ssxy = rx.multiply(ry).sum();

    const slope = ssxy / ssxx;
    const intercept = my - slope * mx;

    // sum of squared residuals
    const ssr = y.add(x.multiply(slope).add(intercept).multiply(-1)).pow(2).sum();

    // residual standard error
    const rse = Math.sqrt(ssr / (n - 2));

    // slope
    const tdistr = new TDistribution(n - 2);

    const slope_se = rse / Math.sqrt(ssxx);
    const slope_t = slope / slope_se;
    const slope_p = 2 * (1 - tdistr.distr(Math.abs(slope_t)));

    // intercept
    const intercept_se = rse / Math.sqrt(ssxx) / Math.sqrt(n) * Math.sqrt(x.pow(2).sum());
    const intercept_t = intercept / intercept_se;
    const intercept_p = 2 * (1 - tdistr.distr(Math.abs(intercept_t)));

    // R-squared
    const rs = Math.pow(ssxy, 2) / (ssxx * ssyy);

    return {n, slope, intercept, rse, slope_se, slope_t, slope_p, intercept_se, intercept_t, intercept_p, rs};
  }

}
