import {Misc} from '../misc';
import {Vector} from '../vector';

/**
 * F distribution
 */
export class FDistribution {

  df1: number;
  df2: number;

  constructor(df1: number, df2: number) {
    this.df1 = df1;
    this.df2 = df2;
  }

  _di(x: number): number {
    return Misc.rbeta((this.df1 * x) / (this.df1 * x + this.df2), this.df1 / 2, this.df2 / 2);
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

}
