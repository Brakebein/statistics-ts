import {Decimal} from 'decimal.js';
import {Numeric} from './numeric';

export class Misc {

  /**
   * error function
   */
  static erf(z: number) {
    let term;
    let sum = 0;
    let n = 0;
    do {
      term = Math.pow(-1, n) * Math.pow(z, 2 * n + 1) / Misc.fac(n) / (2 * n + 1);
      sum += term;
      n++;
    } while (Math.abs(term) > 0.000000000001);
    return sum * 2 / Math.sqrt(Math.PI);
  }

  /**
   * gamma function
   */
  static gamma(n: number): Decimal {
    const p = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];
    const g = 7;
    if (n < 0.5) {
      return new Decimal(Math.PI / Math.sin(Math.PI * n)).mul(Misc.gamma(1 - n));
      // return Math.PI / Math.sin(Math.PI * n) * this.gamma(1 - n);
    }
    n -= 1;
    const t = n + g + 0.5;
    let a = p[0];
    for (let i = 1; i < p.length; i++) {
      a += p[i] / (n + i);
    }

    const powN = new Decimal(t).pow(n + 0.5);
    const powE = new Decimal(Math.E).pow(-t);

    return new Decimal(Math.sqrt(2 * Math.PI)).mul(powN).mul(powE).mul(a);
    // return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * a;
  }

  /**
   * beta function
   */
  static beta(x: number, y: number): number {
    // return Misc.gamma(x) * Misc.gamma(y) / Misc.gamma(x + y);
    return Misc.gamma(x).mul(Misc.gamma(y)).div(Misc.gamma(x + y)).toNumber();
  }

  /**
   * incomplete beta function
   */
  static ibeta(x: number, a: number, b: number): number {
    return Numeric.adaptiveSimpson(y => Math.pow(y, a - 1) * Math.pow(1 - y, b - 1), 0, x, 0.000000000001, 10);
  }

  /**
   * regularized incomplete beta function
   */
  static rbeta(x: number, a: number, b: number): number {
    return this.ibeta(x, a, b) / this.beta(a, b);
  }

  /**
   * factorial
   */
  static fac(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

}
