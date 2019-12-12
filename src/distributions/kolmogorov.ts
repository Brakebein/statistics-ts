import {Numeric} from '../numeric';
import {Vector} from '../vector';

/**
 * Kolmogorov distribution
 */
export class KolmogorovDistribution {

  _di(x: number): number {
    let term;
    let sum = 0;
    let k = 1;

    do {
      term = Math.exp(-Math.pow(2 * k - 1, 2) * Math.pow(Math.PI, 2) / (8 * Math.pow(x, 2)));
      sum += term;
      k++;
    } while (Math.abs(term) > 0.000000000001);

    return Math.sqrt(2 * Math.PI) * sum / x;
  }

  distr(v: Vector): Vector;
  distr(v: number): number;
  distr(v: Vector | number): Vector | number {
    if (v instanceof Vector) {
      return new Vector(v.elements.map(value => this._di(value)));
    } else {
      return this._di(v);
    }
  }

  inverse(x: number): number {
    return Numeric.bisection(y => this._di(y) - x, 0, 1);
  }

}
