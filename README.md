[![Travis](https://img.shields.io/travis/rosendi/farel/master.svg)](https://travis-ci.org/rosendi/farel)

# Farel

Farel is a library that allows you to work with Firebase in the Angular 2 applications in a way that's concise, type-safe, and easy to extend. Using Farel, you won't need to write boilerplate code to ensure that Firebase data is synchronized. Farel does this with a minimum of syntax while at the same time improving type safety and data integrity.

However, Farel does not attempt to replace the features of the entire Firebase client library's API, so feel free to use the Firebase along with it.

## Installation

```bash
$ npm install farel --save-dev
```

Or include this script tag from the CDN:

```
<script src="https://cdn.jsdelivr.net/farel/0.3.0/farel.min.js"></script>
```

## Basic Example

[Live Demo](http://plnkr.co/edit/stDf4Ymr0SX5KGVbdh65)

```typescript
import { FAREL_BASE_URL, Farel, FarelArray, FarelRecord } from 'farel/core';

@Component({
  selector: 'app',

  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <h1>Weather App</h1>

    <div *ngFor="#city of citiesRef | async">
      {{ city.$key }} | {{ city.currently.temperature }} °F
    </div>
  `,
})

class Weather {
  citiesRef: FarelArray<FarelRecord>;

  constructor(farel: Farel) {
    this.citiesRef = farel.asArray(ref => ref.orderByKey(), FarelRecord);
  }
}

bootstrap(Weather, provide(FAREL_BASE_URL, { useValue: 'https://publicdata-weather.firebaseio.com' });
```

## Retrieving Data

Farel provides the `asObject` and `asArray` methods to sync and keep local objects and Angular 2 components up-to-date with any changes made to the remote Firebase database.

Farel will serialize Firebase data to extendable `FarelRecord`, a plain javascript object with the `$ref`, `$key` and `$val` (will be assigned if and only if data is array or primitive value, such as `string`, `number`, `boolean`, etc...) meta keys merged with a Firebase data. The extending technique will be described later in the [Extending Farel Records](#extending-farel-records) section.

NOTE: Since Farel is reactive, don't forget to turn on the `OnPush` change detection strategy - this is a big win because it will only trigger change detection when a new value arrives, and you don't have to cache the custom methods in extended Farel records.

##### <T extends FarelRecord>asObject((ref: Firebase) => Firebase, Constructor<T>) => FarelObject<T>;

Creates an emitter for synchronized Farel record.

Usage:

```javascript
  ref: FarelObject<FarelRecord> = farel.asObject(ref => ref /* query firebase here */, FarelRecord);
```

##### <T extends FarelRecord>asArray((ref: Firebase) => Firebase, Constructor<T>) => FarelArray<T>;

Creates an emitter for a synchronized list of the Farel records. The list should not be modified directly; instead, local changes should be pushed to the server, which will then automatically trickle back.

Usage:

```javascript
  ref: FarelArray<FarelRecord> = farel.asArray(ref => ref /* query firebase here */, FarelRecord);
```

## Reuse Farel Expressions

For cases when piped output is bound to many places within a template, it's beneficial to have a single piped expression. Since Angular 2 [doesn't supporting it](https://github.com/angular/angular/issues/2451) assignment an expression result to a local variable in a native way, it can be done with a custom directive:

```
@Directive({
  selector: '[query]', exportAs: 'query', inputs: ['result: query'],
})

class Query {
  set result(val: any) {
    val ? this['$val'] = val : delete this['$val'];
  }
}

@Component({
  ...

  directives: [
    Query,
  ],

  template: `
    <div [query]="todoRef | toObject" #todo="query">
      <div *ngIf="todo.$val">
        {{ todo.$val.name }}
      </div>

      <span *ngIf="!todo.$val">
        Loading...
      </span>
    <div>
  `,
 });
```

## Extending Farel Records

It is very easy to extend Farel records. All you have to do is subclass the `FarelRecord` class. In the next example, we will create a Farel record which has a serialized property `message` and a computed property `greet`.

```typescript
import { Farel, FarelRecord} from 'farel/core';

interface GreeterAttr {
  message: string;
}

class GreeterRecord extends FarelRecord implements GreeterAttr {
  message: string;

  get greet() {
    return `Hello, ${this.message}`;
  }
}
```

Then we should tell Farel to use our own record factory:

```
let greetersRef = farel.asArray(ref => ref, GreeterRecord); // each child will use the same factory
```

Now any retrieved data by the `ToArrayPipe` or `ToObjectPipe` pipes will be transformed to `GreaterRecord` and both `message` and `greet` can be directly accessed in the Angular 2 templates:

```
  <div *ngFor="greetersRef | toArray">
    {{ contact.greet }}
  </div>
```

## License

[MIT](LICENSE)
