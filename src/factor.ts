export class Factor {

  levels: number[] = [];
  factors: number[] = [];

  constructor(elements: number[]) {
    elements.forEach(value => {
      const index = this.levels.indexOf(value);
      if (index !== -1) {
        this.factors.push(index);
      } else {
        this.factors.push(this.levels.length);
        this.levels.push(value);
      }
    });
  }

  group(g: number): number[] {
    const indices = [];
    let i = -1;
    // tslint:disable-next-line:no-conditional-assignment
    while ((i = this.factors.indexOf(g, i + 1)) !== -1) {
      indices.push(i);
    }
    return indices;
  }

  length(): number {
    return this.factors.length;
  }

  groups(): number {
    return this.levels.length;
  }

}
