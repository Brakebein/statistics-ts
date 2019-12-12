import {TDistribution} from './distributions';
import {Vector} from './vector';

export class Confidence {

  static normal(x: Vector, c: number): [number, number] {
    const alpha = 1 - c;
    const t = new TDistribution(x.length() - 1);
    const lower = x.mean() - t.inverse(1 - alpha / 2) * x.sem();
    const upper = x.mean() + t.inverse(1 - alpha / 2) * x.sem();

    return [lower, upper];
  }

  static normalUpper(x: Vector, c: number): number {
    const alpha = 1 - c;
    const t = new TDistribution(x.length() - 1);

    return x.mean() + t.inverse(1 - alpha) * x.sem();
  }

  static normalLower(x: Vector, c: number): number {
    const alpha = 1 - c;
    const t = new TDistribution(x.length() - 1);

    return x.mean() - t.inverse(1 - alpha) * x.sem();
  }

}
