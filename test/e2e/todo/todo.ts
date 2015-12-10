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
    <todo-key>{{ todosRef.toString() }}</todo-key>

    <main>
      <h1>Todos:</h1>

      <ul class="todo">
        <li *ngFor="#todo of todosRef | toArray">
          <button (click)="removeTodo(todo.$ref)">Remove</button> {{ todo.name }}
        </li>
      </ul>

      <input #name type="text" (keyup)="addTodo($event, name.value)">
    </main>
  `
})

export class Todo {
  todosRef: Firebase;

  constructor() {
    this.todosRef = new Firebase('https://farel.firebaseio.com/todo');
  }

  addTodo(event: any, name: string) {
    if (event.which === 13) {
      this.todosRef.push({ name: name });
    }
  }

  removeTodo(todoRef: Firebase) {
    todoRef.remove();
  }
}

bootstrap(Todo);
