import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { of } from 'rxjs';
import { RandomDog } from './random-dog.class';
import { IRandomDog } from './random-dog.interface';
import { RandomDogsComponent } from './random-dogs.component';
import { By } from '@angular/platform-browser';

describe('RandomDogsComponent tests performance', () => {
  describe('with test fixture.', () => {
    let component: RandomDogsComponent;
    let fixture: ComponentFixture<RandomDogsComponent>;
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
      random.message = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1195.jpg'

      fixture = TestBed.createComponent(RandomDogsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      http = TestBed.get(HttpTestingController);
    });

    function createTest(i: number) {
      it(`loads a new image on refresh #${i}`, () => {
        // Arrange
        // Act
        component.refresh();
        http.expectOne(RandomDogsComponent.DogUrl).flush(random);
        fixture.detectChanges();
        const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
        // Assert
        expect(img.src).toEqual(random.message);
      });
    }

    for (let run = 1; run <= 1000; ++run) {
      createTest(run);
    }
  });

  describe('without test fixture.', () => {
    let http: jasmine.SpyObj<HttpClient>;
    let random: IRandomDog;

    function createTestTarget() {
      return new RandomDogsComponent(http);
    }

    beforeEach(() => {
      random = new RandomDog();
      random.status = 'success';
      random.message = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1195.jpg'

      http = jasmine.createSpyObj<HttpClient>('http', ['get']);
      http.get.and.returnValue(of(JSON.parse(JSON.stringify(random))));
    });

    function createTest(i: number) {
      it(`loads a new image on refresh #${i}.`, () => {
        // Arrange
        const target = createTestTarget();
        // Act
        target.refresh();
        // Assert
        expect(JSON.stringify(target.current)).toEqual(JSON.stringify(random));
      });
    }

    for (let run = 1; run <= 1000; ++run) {
      createTest(run);
    }
  });
});
