export declare class Factor {
    levels: number[];
    factors: number[];
    constructor(elements: number[]);
    group(g: number): number[];
    length(): number;
    groups(): number;
}
