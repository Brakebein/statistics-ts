import { Vector } from './vector';
interface IStudentTResult {
    se: number;
    t: number;
    df: number;
    p: number;
}
export declare class StudentT {
    static test(first: Vector, second: Vector | number): IStudentTResult;
    /**
     * two-sample Student's t-test
     */
    static _twosample(first: Vector, second: Vector): IStudentTResult;
    /**
     * one-sample Student's t-test
     */
    static _onesample(sample: Vector, mu: number): IStudentTResult;
}
export {};
