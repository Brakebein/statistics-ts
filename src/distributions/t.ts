import {Misc} from '../misc';
import {Numeric} from '../numeric';
import {Vector} from '../vector';

/**
 * T distribution
 */
export class TDistribution {

  df: number;

  constructor(df: number) {
    this.df = df;
  }

  _de(x: number): number {
    return (Misc.gamma((this.df + 1) / 2) / (Math.sqrt(this.df * Math.PI) * Misc.gamma(this.df / 2)))
      * Math.pow((1 + Math.pow(x, 2) / this.df), -(this.df + 1) / 2);
  }

  _di(x: number): number {
    if (x < 0) {
      return 0.5 * Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
    } else {
      return 1 - 0.5 * Misc.rbeta(this.df / (Math.pow(x, 2) + this.df), this.df / 2, 0.5);
    }
  }

  dens(v: Vector): Vector;
  dens(v: number): number;
  dens(v: Vector | number): Vector | number {
    if (v instanceof Vector) {
      return new Vector(v.elements.map(value => this._de(value)));
    } else {
      return this._de(v);
    }
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
    return Numeric.bisection(y => this._di(y) - x, -10.1, 10);
  }

}
