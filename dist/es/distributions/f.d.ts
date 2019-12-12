import { Vector } from '../vector';
/**
 * F distribution
 */
export declare class FDistribution {
    df1: number;
    df2: number;
    constructor(df1: number, df2: number);
    _di(x: number): number;
    distr(v: Vector): Vector;
    distr(v: number): number;
}
