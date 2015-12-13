import { View, Component, provide } from 'angular2/core'
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig, LocationStrategy, HashLocationStrategy } from 'angular2/router'
import { FAREL_PIPES } from 'farel/pipes'
import { FAREL_DIRECTIVES } from 'farel/directives'
import * as Firebase from 'firebase'

@Component({
  selector: 'show'
})

@View({
  directives: [
    FAREL_DIRECTIVES,
  ],

  pipes: [
    FAREL_PIPES,
  ],

  template: `
    <div [query]="todoRef | toObject" #todo="query">
      <div *ngIf="todo.$key">
        {{ todo.name }}
      </div>
    </div>
  `,
})

class Show {
  todoRef: Firebase;

  constructor(params: RouteParams) {
    this.todoRef = new Firebase('https://farel.firebaseio.com/todo').child(params.get('id'));
  }
}

@RouteConfig([
  {
    path: './:id',
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
    FAREL_PIPES,
  ],

  template: `
    <todo-key>{{ todosRef.toString() }}</todo-key>

    <aside>
      <ul class="todo">
        <li *ngFor="#todo of todosRef | toArray">
          <button (click)="removeTodo(todo.$ref)">Remove</button>
          <a [routerLink]="['/Show', { id: todo.$key }]">{{ todo.name }}</a>
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

bootstrap(Todo, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
