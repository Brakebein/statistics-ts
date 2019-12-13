import { Vector } from './vector';
export declare class Correlation {
    /**
     * Pearson correlation
     */
    static pearson(x: Vector, y: Vector): {
        r: number;
        t: number;
        df: number;
        p: number;
    };
}
