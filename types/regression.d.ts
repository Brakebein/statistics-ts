import { Vector } from './vector';
export declare class Regression {
    /**
     * simple linear regression
     */
    static linear(x: Vector, y: Vector): {
        n: number;
        slope: number;
        intercept: number;
        rse: number;
        slope_se: number;
        slope_t: number;
        slope_p: number;
        intercept_se: number;
        intercept_t: number;
        intercept_p: number;
        rs: number;
    };
}
