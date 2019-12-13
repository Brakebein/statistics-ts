import { Vector } from '../vector';
/**
 * T distribution
 */
export declare class TDistribution {
    df: number;
    constructor(df: number);
    _de(x: number): number;
    _di(x: number): number;
    dens(v: Vector): Vector;
    dens(v: number): number;
    distr(v: Vector): Vector;
    distr(v: number): number;
    inverse(x: number): number;
}
