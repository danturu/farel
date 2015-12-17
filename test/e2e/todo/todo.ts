import { View, Component, provide } from 'angular2/core'
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig, LocationStrategy, HashLocationStrategy } from 'angular2/router'
import { FAREL_PIPES, FAREL_DIRECTIVES, Farel, FarelRecordAttr, FarelRecordFactory } from 'farel/farel'

export interface TodoAttr extends FarelRecordAttr {
  name: string;
}

export class TodoRecord extends FarelRecordFactory<TodoAttr>() {
  upperName() {
    return this.name.toUpperCase();
  }
}

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
    <div [query]="todoRef  | toObject" #todo="query">
      <div *ngIf="todo.$key">
        {{ todo.name }}
      </div>
    </div>
  `,
})

class Show {
  todoRef: Farel<any>;

  constructor(params: RouteParams) {

  //  this.todoRef = new FarelRef('https://farel.firebaseio.com/todo').child(params.get('id'));
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
    FAREL_DIRECTIVES,
  ],

  pipes: [
    FAREL_PIPES,
  ],

  template: `
    <todo-key>{{ todosRef.toString() }}</todo-key>

    <aside>
      <ul class="todo" [query]="todosRef | limitToLast:10 | toArray" #todos="query">
        <div *ngIf="!todos">Loading...</div>

        <li *ngFor="#todo of todos.$value">
          <button (click)="removeTodo(todo.$ref)">Remove</button>
          <a [routerLink]="['/Show', { id: todo.$key }]">{{ todo.upperName() }}</a>
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
  todosRef: Farel<TodoRecord>;

  constructor() {
    this.todosRef = new Farel('https://farel.firebaseio.com/todo', { useFactory: TodoRecord });
  }

  addTodo(event: any, name: string) {
    if (event.which === 13) {
      this.todosRef.ref.push({ name: name });
    }
  }

  removeTodo(todoRef: Firebase) {
    todoRef.remove();
  }
}

bootstrap(Todo, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
