export class Numeric {

  /**
   * adaptive Simpson
   */
  static adaptiveSimpson(func: (x: number) => number, a: number, b: number, eps: number, depth: number): number {
    const h = b - a;
    const fa = func(a);
    const fb = func(b);
    const fc = func((a + b) / 2);
    const s = (h / 6) * (fa + 4 * fc + fb);
    return this._adaptive(func, a, b, eps, s, fa, fb, fc, depth);
  }

  /**
   * root finding: bisection
   */
  static bisection(func: (x: number) => number, a: number, b: number, eps?: number): number {
    eps = typeof eps !== 'undefined' ? eps : 1e-9;
    while (Math.abs(a - b) > eps) {
      if (func(a) * func((a + b) / 2) < 0) {
        b = (a + b) / 2;
      } else {
        a = (a + b) / 2;
      }
    }
    return (a + b) / 2;
  }

  /**
   * root finding: secant
   */
  static secant(func: (x: number) => number, a: number, b: number, eps?: number): number {
    eps = typeof eps !== 'undefined' ? eps : 1e-9;
    const q = [a, b];
    while (Math.abs(q[0] - q[1]) > eps) {
      q.push((q[0] * func(q[1]) - q[1] * func(q[0])) / (func(q[1]) - func(q[0])));
      q.shift();
    }
    return (q[0] + q[1]) / 2;
  }

  private static _adaptive(func: (x: number) => number, a: number, b: number, eps: number,
                           s: number, fa: number, fb: number, fc: number, depth: number): number {
    const c = (a + b) / 2;
    const h = b - a;
    const d = (a + c) / 2;
    const e = (c + b) / 2;
    const fd = func(d);
    const fe = func(e);
    const left = (h / 12) * (fa + 4 * fd + fc);
    const right = (h / 12) * (fc + 4 * fe + fb);
    const s2 = left + right;
    if (depth <= 0 || Math.abs(s2 - s) <= 15 * eps) {
      return s2 + (s2 - s) / 15;
    } else {
      return this._adaptive(func, a, c, eps / 2, left, fa, fc, fd, depth - 1)
        + this._adaptive(func, c, b, eps / 2, right, fc, fb, fe, depth - 1);
    }
  }

}
