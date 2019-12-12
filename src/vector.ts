export class Vector {

  elements: number[];

  constructor(elements: number[]) {
    this.elements = elements;
  }

  push(...values: number[]): void {
    this.elements.push(...values);
  }

  map(callback: (value: number) => number): Vector {
    return new Vector(this.elements.map(callback));
  }

  length(): number {
    return this.elements.length;
  }

  concat(...vectors: Vector[]): Vector {
    return new Vector(this.elements.concat(...vectors.map(v => v.elements)));
  }

  abs(): Vector {
    return new Vector(this.elements.map(value => Math.abs(value)));
  }

  dot(v: Vector): number {
    if (this.length() !== v.length()) {
      throw new Error('Unequal vector lengths!');
    }
    return this.elements.reduce((result, currentValue, index) => result + currentValue * v.elements[index], 0);
  }

  sum(): number {
    return this.elements.reduce((sum, currentValue) => sum + currentValue, 0);
  }

  log(): Vector {
    return new Vector(this.elements.map(value => Math.log(value)));
  }

  add(v: Vector | number): Vector {
    if (v instanceof Vector) {
      if (this.length() !== v.length()) {
        throw new Error('Unequal vector lengths!');
      }
      return new Vector(this.elements.map((value, index) => value + v.elements[index]));
    } else {
      return new Vector(this.elements.map(value => value + v));
    }
  }

  subtract(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return this.add(v.multiply(-1));
    } else {
      return this.add(v * -1);
    }
  }

  multiply(v: Vector | number): Vector {
    if (v instanceof Vector) {
      if (this.length() !== v.length()) {
        throw new Error('Unequal vector lengths!');
      }
      return new Vector(this.elements.map((value, index) => value * v.elements[index]));
    } else {
      return new Vector(this.elements.map(value => value * v));
    }
  }

  pow(v: Vector | number): Vector {
    if (v instanceof Vector) {
      if (this.length() !== v.length()) {
        throw new Error('Unequal vector lengths!');
      }
      return new Vector(this.elements.map((value, index) => Math.pow(value, v.elements[index])));
    } else {
      return new Vector(this.elements.map(value => Math.pow(value, v)));
    }
  }

  mean(): number {
    return this.elements.reduce((sum, currentValue, index, array) => sum + currentValue / array.length, 0);
  }

  median() {
    const sorted = this.sortElements();
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2) {
      return sorted[middle];
    } else {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
  }

  q1(): number {
    const sorted = this.sort();
    const middle = Math.floor(sorted.length() / 2);
    const e = sorted.slice(0, middle);
    return e.median();
  }

  q3(): number {
    const sorted = this.sort();
    const middle = Math.ceil(sorted.length() / 2);
    const e = sorted.slice(middle);
    return e.median();
  }

  geomean(): number {
    return Math.exp(this.log().sum() / this.elements.length);
  }

  slice(start: number, end?: number): Vector {
    if (typeof end === 'undefined') {
      return new Vector(this.elements.slice(start));
    } else {
      return new Vector(this.elements.slice(start, end));
    }
  }

  sortElements(): number[] {
    return [].concat(this.elements).sort((a, b) => a - b);
  }

  _ecdf(x: number): number {
    const sorted = this.sortElements();
    let count = 0;

    while (count < sorted.length && sorted[count] <= x) {
      count++;
    }

    return count / sorted.length;
  }

  ecdf(v: Vector): Vector;
  ecdf(v: number): number;
  ecdf(v: Vector | number): Vector | number {
    if (v instanceof Vector) {
      return new Vector(v.elements.map(value => this._ecdf(value)));
    } else {
      return this._ecdf(v);
    }
  }

  sort(): Vector {
    return new Vector(this.sortElements());
  }

  min(): number {
    return this.sortElements().shift();
  }

  max(): number {
    return this.sortElements().pop();
  }

  /**
   * unbiased sample variance
   */
  variance(): number {
    return this.ss() / (this.elements.length - 1);
  }

  /**
   * biased sample variance
   */
  biasedVariance(): number {
    return this.ss() / this.elements.length;
  }

  /**
   * corrected sample standard deviation
   */
  sd(): number {
    return Math.sqrt(this.variance());
  }

  /**
   * uncorrected sample standard deviation
   */
  uncorrectedSd(): number {
    return Math.sqrt(this.biasedVariance());
  }

  /**
   * standard error of the mean
   */
  sem(): number {
    return this.sd() / Math.sqrt(this.elements.length);
  }

  /**
   * total sum of squares
   */
  ss(): number {
    const m = this.mean();
    return this.elements.reduce((sum, currentValue) => sum + Math.pow(currentValue - m, 2), 0);
  }

  /**
   * residuals
   */
  res(): Vector {
    return this.add(-this.mean());
  }

  kurtosis(): number {
    return this.res().pow(4).mean() / Math.pow(this.res().pow(2).mean(), 2);
  }

  skewness(): number {
    return this.res().pow(3).mean() / Math.pow(this.res().pow(2).mean(), 3 / 2);
  }

  toString(): string {
    return `[${this.elements.join(', ')}]`;
  }

}
