import {TDistribution} from './distributions';
import {Vector} from './vector';

interface IStudentTResult {
  se: number;
  t: number;
  df: number;
  p: number;
}

export class StudentT {

  static test(first: Vector, second: Vector | number): IStudentTResult {
    if (second instanceof Vector) {
      return StudentT._twosample(first, second);
    } else {
      return StudentT._onesample(first, second);
    }
  }

  /**
   * two-sample Student's t-test
   */
  static _twosample(first: Vector, second: Vector): IStudentTResult {
    const se = Math.sqrt((first.variance() / first.length()) + (second.variance() / second.length()));
    const t = (first.mean() - second.mean()) / se;
    const df = first.length() + second.length() - 2;
    const tdistr = new TDistribution(df);
    const p = 2 * (1 - tdistr.distr(Math.abs(t)));

    return {se, t, df, p};
  }

  /**
   * one-sample Student's t-test
   */
  static _onesample(sample: Vector, mu: number): IStudentTResult {
    const se = Math.sqrt(sample.variance()) / Math.sqrt(sample.length());
    const t = (sample.mean() - mu) / se;
    const df = sample.length() - 1;
    const tdistr = new TDistribution(df);
    const p = 2 * (1 - tdistr.distr(Math.abs(t)));

    return {se, t, df, p};
  }

}
