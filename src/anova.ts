import {FDistribution} from './distributions';
import {Factor} from './factor';
import {Vector} from './vector';

export class Anova {

  /**
   * One-way ANOVA
   */
  static oneway(x: Factor, y: Vector) {
    const vectors: Vector[] = [];

    for (let i = 0; i < x.groups(); i++) {
      const vec = new Vector([]);
      const indices = x.group(i);
      for (const index of indices) {
        vec.push(y.elements[index]);
      }
      vectors.push(vec);
    }

    const mean = new Vector([]);
    const n = new Vector([]);
    const v = new Vector([]);

    for (const vec of vectors) {
      mean.push(vec.mean());
      n.push(vec.length());
      v.push(vec.variance());
    }

    const tdf = x.groups() - 1;
    const tss = mean.add(-y.mean()).pow(2).multiply(n).sum();
    const tms = tss / tdf;

    const edf = x.length() - x.groups();
    const ess = v.multiply(n.add(-1)).sum();
    const ems = ess / edf;

    const f = tms / ems;

    const fdistr = new FDistribution(tdf, edf);
    const p = 1 - fdistr.distr(Math.abs(f));

    return {tdf, tss, tms, edf, ess, ems, f, p};
  }

}
