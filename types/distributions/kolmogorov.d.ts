import { Vector } from '../vector';
/**
 * Kolmogorov distribution
 */
export declare class KolmogorovDistribution {
    _di(x: number): number;
    distr(v: Vector): Vector;
    distr(v: number): number;
    inverse(x: number): number;
}
