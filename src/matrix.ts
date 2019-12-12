export class Matrix {

  elements: number[][];

  constructor(elements: number[][]) {
    this.elements = elements;
  }

  rows(): number {
    return this.elements.length;
  }

  cols(): number {
    return this.elements[0].length;
  }

  dot(mat: Matrix): Matrix {
    const result = [];
    for (let i = 0, l = this.rows(); i < l; i++) {
      result.push([]);
      for (let j = 0, m = mat.cols(); j < m; j++) {
        let sum = 0;
        for (let k = 0, n = this.cols(); k < n; k++) {
          sum += this.elements[i][k] * mat.elements[k][j];
        }
        result[i].push(sum);
      }
    }
    return new Matrix(result);
  }

}
