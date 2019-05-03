import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RandomDog } from './random-dog.class';
import { IRandomDog } from './random-dog.interface';
import { RandomDogsComponent } from './random-dogs.component';

describe('RandomDogsComponent tests with test fixture', () => {
  let component: RandomDogsComponent;
  let fixture: ComponentFixture<RandomDogsComponent>;
  let injector: TestBed;
  let http: HttpTestingController;
  let random: IRandomDog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RandomDogsComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule]
    }).compileComponents();
  }));

  afterEach(() => {
    const ele: HTMLElement = fixture.debugElement.nativeElement;
    ele.remove();
    fixture.destroy();
  });

  beforeEach(() => {
    random = new RandomDog();
    random.status = 'success';
    random.message = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1195.jpg';

    fixture = TestBed.createComponent(RandomDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injector = getTestBed();
    http = injector.get(HttpTestingController);
  });

  it('loads a new image on refresh.', () => {
    // Arrange
    // Act
    component.refresh();
    http.expectOne(RandomDogsComponent.DogUrl).flush(random);
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    // Assert
    expect(img.src).toEqual(random.message);
  });

  it('loads the default image on a failure.', () => {
    // Arrange
    // Act
    component.refresh();
    http.expectOne(RandomDogsComponent.DogUrl).flush('failed', { status: 404, statusText: 'not found' });
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    // Assert
    expect(img.src).toEqual(jasmine.stringMatching(new RandomDog().message));
  });

  it('loads the failure message on failure.', () => {
    // Arrange
    // Act
    component.refresh();
    http.expectOne(RandomDogsComponent.DogUrl).flush('failed', { status: 404, statusText: 'not found' });
    fixture.detectChanges();
    // Assert
    expect(component.current.status).toEqual('failed');
  });

  it('sets the loading flag to true when the component is refreshing.', () => {
    // Arrange
    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('.new-dog-button')).nativeElement;
    // Act
    btn.click();
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    // Assert
    expect(spinner).toBeTruthy();
  });

  it('sets the loading flag to falsee when the component has finished refreshing.', () => {
    // Arrange
    // Act
    component.refresh();
    http.expectOne(RandomDogsComponent.DogUrl).flush(random);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    // Assert
    expect(spinner).toBeFalsy();
  });
});
