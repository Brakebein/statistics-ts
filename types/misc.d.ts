import { Decimal } from 'decimal.js';
export declare class Misc {
    /**
     * error function
     */
    static erf(z: number): number;
    /**
     * gamma function
     */
    static gamma(n: number): Decimal;
    /**
     * beta function
     */
    static beta(x: number, y: number): number;
    /**
     * incomplete beta function
     */
    static ibeta(x: number, a: number, b: number): number;
    /**
     * regularized incomplete beta function
     */
    static rbeta(x: number, a: number, b: number): number;
    /**
     * factorial
     */
    static fac(n: number): number;
}
