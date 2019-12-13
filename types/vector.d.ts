export declare class Vector {
    elements: number[];
    constructor(elements: number[]);
    push(...values: number[]): void;
    map(callback: (value: number) => number): Vector;
    length(): number;
    concat(...vectors: Vector[]): Vector;
    abs(): Vector;
    dot(v: Vector): number;
    sum(): number;
    log(): Vector;
    add(v: Vector | number): Vector;
    subtract(v: Vector | number): Vector;
    multiply(v: Vector | number): Vector;
    pow(v: Vector | number): Vector;
    mean(): number;
    median(): number;
    q1(): number;
    q3(): number;
    geomean(): number;
    slice(start: number, end?: number): Vector;
    sortElements(): number[];
    _ecdf(x: number): number;
    ecdf(v: Vector): Vector;
    ecdf(v: number): number;
    sort(): Vector;
    min(): number;
    max(): number;
    /**
     * unbiased sample variance
     */
    variance(): number;
    /**
     * biased sample variance
     */
    biasedVariance(): number;
    /**
     * corrected sample standard deviation
     */
    sd(): number;
    /**
     * uncorrected sample standard deviation
     */
    uncorrectedSd(): number;
    /**
     * standard error of the mean
     */
    sem(): number;
    /**
     * total sum of squares
     */
    ss(): number;
    /**
     * residuals
     */
    res(): Vector;
    kurtosis(): number;
    skewness(): number;
    toString(): string;
}
