[![Travis](https://img.shields.io/travis/rosendi/firepipe/master.svg)](https://travis-ci.org/rosendi/firepipe)
[![GitHub release](https://img.shields.io/github/release/rosendi/firepipe.svg)](https://github.com/rosendi/firepipe/releases)

# Firepipe

Firepipe is a collection of the [Angular 2](http://angular.io) pipes for [Firebase](http://firebase.com).

## Installation

```bash
$ npm install firepipe --save-dev
```

## Basic Example

[Live Demo](http://plnkr.co/edit/stDf4Ymr0SX5KGVbdh65)

```typescript
import { FIREBASE_PIPES } from 'firepipe/firepipe'

...

@View({
  pipes: [
    FIREBASE_PIPES
  ],

  template: `
    <h1>Weather</h1>

    <ul class="weather">
      <li *ng-for="#city of citiesRef | orderByKey | startAt:'newyork' | endAt: 'sanfrancisco'| toArray">
        {{ city.$key }} | {{ city.currently.temperature }} °F
      </li>
    </ul>
  `
})

class Weather {
  citiesRef: Firebase;

  constructor() {
    this.citiesRef = new Firebase('https://publicdata-weather.firebaseio.com'); // or just a firebase url
  }
}
```

## Documentation

Upcoming...

#### Value Pipes:

- OnValuePipe
- ToObjectPipe
- ToArrayPipe
- HasChildrenPipe
- NumChildrenPipe
- IsExistPipe

#### Query Pipes:

- ChildPipe
- OrderByChildPipe
- OrderByKeyPipe
- OrderByValuePipe
- OrderByPriorityPipe
- StartAtPipe
- EndAtPipe
- EqualToPipe
- LimitToFirstPipe
- LimitToLastPipe

#### Directives:

- AssignLocal

## License

[MIT](LICENSE)
