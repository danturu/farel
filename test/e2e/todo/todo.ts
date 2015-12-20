import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouterOutlet, RouteParams, RouteConfig } from 'angular2/router';

import { Farel, FarelRecordAttr, FarelRecordFactory } from '../../../farel/core';
import { FAREL_PIPES, FAREL_DIRECTIVES } from '../../../farel/common';

export interface TodoAttr extends FarelRecordAttr {
  name: string;
}

export class TodoRecord extends FarelRecordFactory<TodoAttr>() {
  upperName() {
    return this.name.toUpperCase();
  }
}

@Component({
  selector: 'show',

  directives: [
    FAREL_DIRECTIVES,
  ],

  pipes: [
    FAREL_PIPES,
  ],

  template: `
    <div [query]="todoRef | toObject" #todo="query">
      <div *ngIf="todo.$value">
        {{ todo.$value.name }}
      </div>
    </div>
  `,
})

class ShowTodo {
  todoRef: Farel<TodoRecord>;

  constructor(params: RouteParams) {
    this.todoRef = new Farel('https://farel.firebaseio.com/todo').child(params.get('id'));
  }
}

@Component({
  selector: 'app',

  changeDetection: ChangeDetectionStrategy.OnPush,

  directives: [
    FAREL_DIRECTIVES,
    ROUTER_DIRECTIVES,
  ],

  pipes: [
    FAREL_PIPES,
  ],

  template: `
    <todo-key>{{ todosRef?.toString() }}</todo-key>

    <aside>
      <ul class="todo" [query]="todosRef | limitToLast:10 | toArray" #todos="query">
        <div *ngIf="!todos">Loading...</div>

        <li *ngFor="#todo of todos.$value">
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
  todosRef: Farel<TodoRecord>;

  constructor() {
    this.todosRef = new Farel('https://farel.firebaseio.com/todo', { useFactory: TodoRecord });
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
