export declare class Numeric {
    /**
     * adaptive Simpson
     */
    static adaptiveSimpson(func: (x: number) => number, a: number, b: number, eps: number, depth: number): number;
    /**
     * root finding: bisection
     */
    static bisection(func: (x: number) => number, a: number, b: number, eps?: number): number;
    /**
     * root finding: secant
     */
    static secant(func: (x: number) => number, a: number, b: number, eps?: number): number;
    private static _adaptive;
}
