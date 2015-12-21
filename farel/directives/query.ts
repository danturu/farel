import { Directive } from 'angular2/core';

@Directive({
  selector: '[query]', exportAs: 'query', inputs: ['result: query'],
})

export class Query {
  set result(val: any) {
    val ? this['$val'] = val : delete this['$val'];
  }
}
