import { Directive } from 'angular2/core'

@Directive({
  selector: '[query]', exportAs: 'query', inputs: ['result: query'],
})

export class Query {
  set result(val: any) {
    if (val === null || val === undefined) {
      return;
    }

    if (typeof val === 'object' && !Array.isArray(val)) {
      Object.keys(val).forEach(key => this[key] = val[key]);
    } else {
      this['$value'] = val;
    }
  }
}
