import { Vector } from './vector';
export declare class Nonparametric {
    /**
     * Two-sample Kolmogorov-Smirnov test
     */
    kolmogorovSmirnov(x: Vector, y: Vector): {
        d: number;
        ks: number;
        p: number;
    };
}
