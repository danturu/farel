import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export enum FirebaseEventType { ChildAdded, ChildChanged, ChildMoved, ChildRemoved, Value }

export type FirebaseEventCallback = { eventType: FirebaseEventType, snapshot: FirebaseDataSnapshot, prevChild: string }

export type FirebaseEventInstruction = { eventType: FirebaseEventType, emitOnce?: boolean }

export class FirebaseEmitter {
  private _emitter: Observable<FirebaseEventCallback>;

  constructor(private _ref: FirebaseQuery, eventInstructions: FirebaseEventInstruction[]) {
    let observer = (observer: Observer<FirebaseEventCallback>) => {
      let subscribe = (dispose: Function, instruction: FirebaseEventInstruction) => {
        let firebaseEvent = this._normalizeEventName(instruction.eventType);

        let eventCallback = (snapshot: FirebaseDataSnapshot, prevChild?: string) => {
          observer.next({ eventType: instruction.eventType, snapshot: snapshot, prevChild: prevChild });
        }

        let errorCallback = (error: any) => {
          observer.error(error);
        }

        if (instruction.emitOnce) {
          this._ref.once(firebaseEvent, eventCallback, errorCallback);
        } else {
          this._ref.on(firebaseEvent, eventCallback, errorCallback);
        }

        return () => {
          this._ref.off(firebaseEvent, eventCallback);
          dispose();
        }
      }

      return eventInstructions.reduce(subscribe.bind(this), () => { /* dispose */ });
    }

    this._emitter = Observable.create(observer);
  }

  get emitter(): Observable<FirebaseEventCallback> {
    return this._emitter;
  }

  ref(): Firebase {
    return this._ref.ref();
  }

  toString(): string {
    return this._ref.toString();
  }

  private _normalizeEventName(eventType: FirebaseEventType): string {
    switch (eventType) {
      case FirebaseEventType.ChildAdded:
        return 'child_added';

      case FirebaseEventType.ChildChanged:
        return 'child_changed';

      case FirebaseEventType.ChildMoved:
        return 'child_moved';

      case FirebaseEventType.ChildRemoved:
        return 'child_removed';

      case FirebaseEventType.Value:
        return 'value';
    }
  }
}
