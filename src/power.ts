import {NormalDistribution} from './distributions';

export class Power {

  /**
   * Sample size calculation
   */
  static sampleSize(a: number, power: number, sd: number, effect: number): number {
    const n = new NormalDistribution(0, 1);
    return (2 * Math.pow(n.inverse(1 - a / 2) + n.inverse(power), 2) * Math.pow(sd, 2)) / Math.pow(effect, 2);
  }

}
