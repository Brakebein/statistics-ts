import { Vector } from '../vector';
/**
 * Normal distribution
 */
export declare class NormalDistribution {
    mean: number;
    variance: number;
    constructor(mean: number, variance: number);
    _de(x: number): number;
    _di(x: number): number;
    dens(v: Vector): Vector;
    dens(v: number): number;
    distr(v: Vector): Vector;
    distr(v: number): number;
    inverse(x: number): number;
}
