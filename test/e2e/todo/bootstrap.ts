import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';

import { FAREL_BASE_URL, Farel } from '../../../farel/core';
import { App } from './todo'

bootstrap(App, [ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(FAREL_BASE_URL, { useValue: 'https://farel.firebaseio.com' }),
  Farel,
]);
