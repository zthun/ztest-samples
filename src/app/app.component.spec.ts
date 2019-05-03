import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterConfig, RouterRoutes } from './app.routing';
import { RandomDogsComponent } from './random-dogs/random-dogs.component';
import { WelcomeComponent } from './welcome/welcome.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AppComponent,
        RandomDogsComponent,
        WelcomeComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(RouterRoutes, RouterConfig),
        MatTabsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  afterEach(() => {
    const ele: HTMLElement = fixture.debugElement.nativeElement;
    ele.remove();
    fixture.destroy();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
