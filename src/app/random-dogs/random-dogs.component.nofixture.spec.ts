import { RandomDogsComponent } from './random-dogs.component';
import { HttpClient } from '@angular/common/http';
import { IRandomDog } from './random-dog.interface';
import { RandomDog } from './random-dog.class';
import { of, throwError, Subject } from 'rxjs';

describe('RandomDogsComponent tests without test fixture', () => {
  let http: jasmine.SpyObj<HttpClient>;
  let random: IRandomDog;

  function createTestTarget() {
    return new RandomDogsComponent(http);
  }

  beforeEach(() => {
    random = new RandomDog();
    random.status = 'success';
    random.message = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1195.jpg';

    http = jasmine.createSpyObj<HttpClient>('http', ['get']);
    http.get.and.returnValue(of(JSON.parse(JSON.stringify(random))));
  });

  it('loads a new image on refresh.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.refresh();
    // Assert
    expect(JSON.stringify(target.current)).toEqual(JSON.stringify(random));
  });

  it('loads the default image on a failure.', () => {
    // Arrange
    const target = createTestTarget();
    http.get.and.returnValue(throwError('nope'));
    // Act
    target.refresh();
    // Assert
    expect(target.current.message).toEqual(new RandomDog().message);
  });

  it('loads the failure message on failure.', () => {
    // Arrange
    const target = createTestTarget();
    http.get.and.returnValue(throwError('nope'));
    // Act
    target.refresh();
    // Assert
    expect(target.current.status).toEqual('failed');
  });

  it('sets the loading flag to true when the component is refreshing.', () => {
    // Arrange
    const target = createTestTarget();
    http.get.and.returnValue(new Subject<IRandomDog>());
    // Act
    target.refresh();
    // Assert
    expect(target.loading).toBeTruthy();
  });

  it('sets the loading flag to falsee when the component has finished refreshing.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.refresh();
    // Assert
    expect(target.loading).toBeFalsy();
  });

  it('resets the dog to the default.', () => {
    // Arrange
    const target = createTestTarget();
    target.refresh();
    // Act
    target.reset();
    // Assert
    expect(target.current.status).toEqual('default');
  });
});


