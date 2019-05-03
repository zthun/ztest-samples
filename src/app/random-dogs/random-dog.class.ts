import { IRandomDog } from './random-dog.interface';

export class RandomDog implements IRandomDog {
  public message: string;

  public constructor(public status = 'default') {
    this.message = 'assets/dog.jpg';
  }
}
