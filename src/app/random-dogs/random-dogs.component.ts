import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RandomDog } from './random-dog.class';
import { IRandomDog } from './random-dog.interface';

@Component({
  selector: 'app-random-dogs',
  templateUrl: './random-dogs.component.html',
  styleUrls: ['./random-dogs.component.css']
})
export class RandomDogsComponent {
  public static DogUrl = 'https://dog.ceo/api/breeds/image/random';
  public loading: boolean;

  public current: IRandomDog;

  public constructor(private _http: HttpClient) {
    this.loading = false;
    this.current = new RandomDog();
  }

  public refresh() {
    this.loading = true;

    this._http.get<IRandomDog>(RandomDogsComponent.DogUrl).pipe(
      catchError(() => of(new RandomDog('failed'))),
      finalize(() => this.loading = false)
    ).subscribe((dog: IRandomDog) => this.current = dog);
  }

  public reset() {
    this.current = new RandomDog();
  }
}
