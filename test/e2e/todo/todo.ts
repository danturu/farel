import { Component, Directive, ChangeDetectionStrategy } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig } from 'angular2/router';

import { Farel, FarelObject, FarelArray, FarelRecord } from '../../../farel/farel';

@Directive({
  selector: '[query]', exportAs: 'query', inputs: ['result: query'],
})

export class Query {
  set result(val: any) {
    val ? this['$val'] = val : delete this['$val'];
  }
}

export interface TodoAttr {
  name: string;
}

export class TodoRecord extends FarelRecord {
  name: string;

  upperName() {
    return this.name.toUpperCase();
  }
}

@Component({
  selector: 'show',

  directives: [
    Query,
  ],

  template: `
    <div [query]="todoRef | async" #todo="query">
      <div *ngIf="todo.$val">
        {{ todo.$val.upperName() }}
      </div>
    </div>
  `,
})

class ShowTodo {
  todoRef: FarelObject<TodoRecord>;

  constructor(params: RouteParams, farel: Farel) {
    this.todoRef = farel.asObject(ref => ref.child('todo').child(params.get('id')), TodoRecord);
  }
}

@Component({
  selector: 'app',

  changeDetection: ChangeDetectionStrategy.OnPush,

  directives: [
    ROUTER_DIRECTIVES,
  ],

  template: `
    <todo-key>{{ todosRef?.toString() }}</todo-key>

    <aside>
      <ul class="todo">
        <li *ngFor="#todo of todosRef | async">
          <a [routerLink]="['Todo', { id: todo.$key }]">{{ todo.upperName() }}</a>
          <button (click)="removeTodo(todo.$ref)">Remove</button>
        </li>
      </ul>

      <input #name type="text" (keyup)="addTodo($event, name.value)">
    </aside>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})

@RouteConfig([
  { path: './:id', component: ShowTodo, name: 'Todo' },
])

export class App {
  todosRef: FarelArray<TodoRecord>;

  constructor(farel: Farel) {
    this.todosRef = farel.asArray(ref => ref.child('todo'), TodoRecord);
  }

  addTodo(event: KeyboardEvent, name: string) {
    if (event.which === 13) {
      this.todosRef.ref.push({ name: name });
    }
  }

  removeTodo(todoRef: Firebase) {
    todoRef.remove();
  }
}
