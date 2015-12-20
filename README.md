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
<script src="https://cdn.jsdelivr.net/farel/0.2.0/farel.min.js"></script>
```

## Basic Example

[Live Demo](http://plnkr.co/edit/stDf4Ymr0SX5KGVbdh65)

```typescript
import { Farel, FarelRecord } from 'farel/core';
import { FAREL_PIPES } from 'farel/common';

@Component({
  selector: 'app',

  changeDetection: ChangeDetectionStrategy.OnPush,

  pipes: [
    FAREL_PIPES,
  ],

  template: `
    <h1>Weather App</h1>

    <div *ngFor="#city of citiesRef | orderByKey | startAt:'newyork' | endAt: 'sanfrancisco'| toArray">
      {{ city.$key }} | {{ city.currently.temperature }} °F
    </div>
  `,
})

class Weather {
  citiesRef: Farel<FarelRecord>;

  constructor() {
    this.citiesRef = new Farel('https://publicdata-weather.firebaseio.com');
  }
}
```

## Retrieving Data

Farel provides `ToObjectPipe` and `ToArrayPipe` pipes to sync and keep local objects and Angular 2 components up-to-date with any changes made to the remote Firebase database.

Farel will serialize Firebase data to `FarelRecord`, a plain javascript object with some extra meta keys merged with a Firebase data. `FarelRecord` can be extended with custom methods using `FarelRecordFactory`. The extending technique will be described later in the [Extending Farel Records](#extending-farel-records) section.

To use any of the Farel pipes in your Angular 2 application, import `FAREL_PIPES` from `'farel/common'` barrel and list them in the `@Component` decorator's pipes array as it's shown in the basic example above.

NOTE: Farel pipes only work with Farel service, so any Firebase reference should be wrapped in the Farel reference like this `let ref = new Farel(new Firebase('...'))`.

NOTE: Since Farel is reactive, don't forget to turn on the `OnPush` change detection strategy - this is a big win because it will only trigger change detection when a new value arrives, and you don't have to cache the custom methods in extended Farel records.

##### ToObjectPipe

Creates a synchronized Farel record. Assigns the `$key`, `$val` meta keys. The `$val` key will be assigned if and only if data is array or primitive value, such as `string`, `number`, `boolean`, etc...

Usage:

```javascript
farelRef | toObject
```

##### ToArrayPipe

Creates a synchronized list of the Farel records, serialized in the same way as `ToObjectPipe`. The list should not be modified directly; instead, local changes should be pushed to the server, which will then automatically trickle back.

Usage:

```javascript
farelRef | toObject
```

## Querying Data

To construct [Firebase queries](https://www.firebase.com/docs/web/api/query/), Farel provides the query pipes that cover the entire Firebase querying system and have exactly the same API. You can chain expressions through multiple pipes to conduct complex queries using the pipe operator.

Available query pipes:

- `ChildPipe`
- `OrderByChildPipe`
- `OrderByKeyPipe`
- `OrderByValuePipe`
- `OrderByPriorityPipe`
- `StartAtPipe`
- `EndAtPipe`
- `EqualToPipe`
- `LimitToFirstPipe`
- `LimitToLastPipe`

## Reuse Farel Expressions

For cases when piped output is bound to many places within a template, it's beneficial to have a single piped expression. Farel will provide a `Query` directive that assigns an expression result to a local variable, until Angular 2 [starts supporting it](https://github.com/angular/angular/issues/2451) in a native way.

To use this directive in your Angular 2 application, import `FAREL_DIRECTIVES` from `'farel/common'` barrel and list it in the `@Component` decorator's directives array like in the example below.

```
import { FAREL_DIRECTIVES } from 'farel/common';

@Component({
  ...

  directives: [
    FAREL_DIRECTIVES,
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

It is very easy to extend Farel records. All you have to do is subclass the `FarelRecord` and extend `FarelAttr` interface. In the next example, we will create a Farel record which has a serialized property `message` and a computed property `greet`.

```typescript
import { Farel, FarelRecordAttr, FarelRecordFactory } from 'farel/core';

interface GreeterAttr extends FarelRecordAttr {
  message: string;
}

class GreeterRecord extends FarelRecordFactory<GreeterAttr>() {
    get greet() {
        return `Hello, ${this.message}`;
    }
}
```

Then we should tell Farel to use our own record factory:

```
let greetersRef = new Farel('...', { useFactory: GreeterRecord });
```

Now any retrieved data by the `ToArrayPipe` or `ToObjectPipe` pipes will be transformed to `GreaterRecord` and both `message` and `greet` can be directly accessed in the Angular 2 templates:

```
  <div *ngFor="greetersRef | toArray">
    {{ contact.greet }}
  </div>
```

NOTE: What we don't have to explicitly declare variable `message` in `GreeterRecord`, since it's extended from the `FarelRecordFactory`.

## License

[MIT](LICENSE)
