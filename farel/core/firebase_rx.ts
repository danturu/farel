import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { toFirebaseQuery } from '../utils/to_firebase_query';

export enum FirebaseEventType { ChildAdded, ChildChanged, ChildMoved, ChildRemoved, Value }

export type FirebaseEventCallback = { eventType: FirebaseEventType, snapshot: FirebaseDataSnapshot, prevChild: string }

export type FirebaseEventDefenition = { eventType: FirebaseEventType, once?: boolean }

export class FirebaseRx {
  private _firebaseQuery: FirebaseQuery;
  private _events: Observable<FirebaseEventCallback>;

  constructor(firebaseQuery: string | FirebaseQuery, eventDefenitions: FirebaseEventDefenition[]) {
    this._firebaseQuery = toFirebaseQuery(firebaseQuery);

    this._events = Observable.create((observer: Observer<FirebaseEventCallback>) => {
      return eventDefenitions.reduce((disposeCallback: Function, eventDefenition: FirebaseEventDefenition) => {
        let eventName = this._normalizeEventName(eventDefenition.eventType);

        let callback = (snapshot: FirebaseDataSnapshot, prevChild?: string) => {
          observer.next({ eventType: eventDefenition.eventType, snapshot: snapshot, prevChild: prevChild });
        }

        let cancelCallback = (error: any) => {
          observer.error(error);
        }

        if (eventDefenition.once) {
          this._firebaseQuery.once(eventName, callback, cancelCallback);
        } else {
          this._firebaseQuery.on(eventName, callback, cancelCallback);
        }

        return () => {
          this._firebaseQuery.off(eventName, callback);
          disposeCallback();
        }
      }, () => {});
    });
  }

  get events(): Observable<FirebaseEventCallback> {
    return this._events;
  }

  ref() {
    return this._firebaseQuery.ref();
  }

  toString() {
    return this._firebaseQuery.toString();
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
