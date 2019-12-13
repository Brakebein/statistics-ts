import { Factor } from './factor';
import { Vector } from './vector';
export declare class Anova {
    /**
     * One-way ANOVA
     */
    static oneway(x: Factor, y: Vector): {
        tdf: number;
        tss: number;
        tms: number;
        edf: number;
        ess: number;
        ems: number;
        f: number;
        p: number;
    };
}
