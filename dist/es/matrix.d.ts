export declare class Matrix {
    elements: number[][];
    constructor(elements: number[][]);
    rows(): number;
    cols(): number;
    dot(mat: Matrix): Matrix;
}
