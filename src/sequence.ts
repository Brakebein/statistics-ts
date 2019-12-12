import {Vector} from './vector';

export class Sequence extends Vector {

  constructor(min: number, max: number, step: number) {
    const elements = [];
    for (let i = min; i <= max; i += step) {
      elements.push(i);
    }

    super(elements);
  }

}
