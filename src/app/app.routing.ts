import { Route, ExtraOptions } from '@angular/router';
import { RandomDogsComponent } from './random-dogs/random-dogs.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const WelcomeUrl = 'welcome';
export const RandomDogsUrl = 'dogs';
export const DefaultUrl = WelcomeUrl;

export const AppRoute: Route = {
  path: WelcomeUrl,
  component: WelcomeComponent
};

export const RandomDogsRoute: Route = {
  path: RandomDogsUrl,
  component: RandomDogsComponent
};

export const DefaultRoute: Route = {
  path: '',
  pathMatch: 'full',
  redirectTo: DefaultUrl
};

export const NotFoundRoute: Route = {
  path: '**',
  pathMatch: 'full',
  redirectTo: DefaultUrl
};

export const RouterRoutes = [
  AppRoute,
  RandomDogsRoute,
  DefaultRoute,
  NotFoundRoute
];

export const RouterConfig: ExtraOptions = {
  useHash: true
};
