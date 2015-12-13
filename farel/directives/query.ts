import { Directive } from 'angular2/core';

@Directive({
  selector: '[query]', exportAs: 'query', inputs: ['result: query'],
})

export class Query {
  set result(value: any) {
    if (value) {
      this['$value'] = value;
    } else {
      delete this['$value'];
    }
  }
}
