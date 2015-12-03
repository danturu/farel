import { View, Component, bootstrap } from 'angular2/angular2'
import { FIREBASE_PIPES } from 'farel/farel'

import * as Firebase from 'firebase'

@Component({
  selector: 'app'
})

@View({
  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <todo-key>{{ todoRef.toString() }}</todo-key>

    <main>
      <h1>Todos:</h1>
    </main>
  `
})

export class Todo {
  todoRef: String = '';

  constructor() {
  }
}

bootstrap(Todo);
