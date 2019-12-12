import { Vector } from './vector';
export declare class Confidence {
    static normal(x: Vector, c: number): [number, number];
    static normalUpper(x: Vector, c: number): number;
    static normalLower(x: Vector, c: number): number;
}
