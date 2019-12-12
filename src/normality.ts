import {StandardNormalDistribution} from './distributions';
import {Vector} from './vector';

export class Normality {

  static shapiroWilk(x: Vector) {
    const xx = x.sort();
    const n = x.length();
    const u = 1 / Math.sqrt(n);

    // m
    const sn = new StandardNormalDistribution();
    const m = new Vector([]);
    for (let i = 1; i <= n; i++) {
      m.push(sn.inverse((i - 3 / 8) / (n + 1 / 4)));
    }

    // c
    const md = m.dot(m);
    const c = m.multiply(1 / Math.sqrt(md));

    // a
    const an = -2.706056 * Math.pow(u, 5) + 4.434685 * Math.pow(u, 4) - 2.071190 * Math.pow(u, 3)
      - 0.147981 * Math.pow(u, 2) + 0.221157 * u + c.elements[n - 1];
    const ann = -3.582633 * Math.pow(u, 5) + 5.682633 * Math.pow(u, 4) - 1.752461 * Math.pow(u, 3)
      - 0.293762 * Math.pow(u, 2) + 0.042981 * u + c.elements[n - 2];

    const a = new Vector([]);
    if (n > 5) {
      const phi = (md - 2 * Math.pow(m.elements[n - 1], 2) - 2 * Math.pow(m.elements[n - 2], 2))
        / (1 - 2 * Math.pow(an, 2) - 2 * Math.pow(ann, 2));

      a.push(-an);
      a.push(-ann);
      for (let i = 2; i < n - 2; i++) {
        a.push(m.elements[i] * Math.pow(phi, -1 / 2));
      }
      a.push(ann);
      a.push(an);
    } else {
      const phi = (md - 2 * Math.pow(m.elements[n - 1], 2)) / (1 - 2 * Math.pow(an, 2));

      a.push(-an);
      for (let i = 1; i < n - 1; i++) {
        a.push(m.elements[i] * Math.pow(phi, -1 / 2));
      }
      a.push(an);
    }

    // w
    const w = Math.pow(a.multiply(xx).sum(), 2) / xx.ss();

    // p
    let g;
    let mu;
    let sigma;

    if (n < 12) {
      const gamma = 0.459 * n - 2.273;
      g = - Math.log(gamma - Math.log(1 - w));
      mu = -0.0006714 * Math.pow(n, 3) + 0.025054 * Math.pow(n, 2) - 0.39978 * n + 0.5440;
      sigma = Math.exp(-0.0020322 * Math.pow(n, 3) + 0.062767 * Math.pow(n, 2) - 0.77857 * n + 1.3822);
    } else {
      const logn = Math.log(n);
      g = Math.log(1 - w);
      mu = 0.0038915 * Math.pow(logn, 3) - 0.083751 * Math.pow(logn, 2) - 0.31082 * logn - 1.5851;
      sigma = Math.exp(0.0030302 * Math.pow(logn, 2) - 0.082676 * logn - 0.4803);
    }

    const z = (g - mu) / sigma;
    const norm = new StandardNormalDistribution();
    const p = 1 - norm.distr(z);

    return {w, p};
  }

}
