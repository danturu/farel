import { View, Component, bootstrap } from 'angular2/angular2'
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig } from 'angular2/router'
import { FIREBASE_PIPES } from 'farel/farel'

import * as Firebase from 'firebase'

@Component({
  selector: 'show'
})

@View({
  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    hello
  `,
})

class Show {
}

@RouteConfig([
  {
    path: '/:id',
    component: Show,
    name: 'Show',
  },
])

@Component({
  selector: 'app'
})

@View({
  directives: [
    ROUTER_DIRECTIVES,
  ],

  pipes: [
    FIREBASE_PIPES,
  ],

  template: `
    <todo-key>{{ todosRef.toString() }}</todo-key>

    <aside>
      <ul class="todo">
        <li *ngFor="#todo of todosRef | toArray">
          <button (click)="removeTodo(todo.$ref)">Remove</button>

          <a [routerLink]="['Show', { id: todo.$key }]">{{ todo.name }}</a>
        </li>
      </ul>

      <input #name type="text" (keyup)="addTodo($event, name.value)">
    </aside>

    <main>
      <router-outlet></router-outlet>
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

bootstrap(Todo, [ROUTER_PROVIDERS]);
