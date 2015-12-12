import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { toFirebaseQuery } from '../utils/to_firebase_query';

export enum FirebaseEventType { Added, Changed, Moved, Removed, Value }

export type FirebaseEvent = { eventType: FirebaseEventType, snapshot: FirebaseDataSnapshot, prevChild: string }

const FIREBASE_EVENT_NAME = {
  [FirebaseEventType.Added]: 'child_added',
  [FirebaseEventType.Changed]: 'child_changed',
  [FirebaseEventType.Moved]: 'child_moved',
  [FirebaseEventType.Removed]: 'child_removed',
  [FirebaseEventType.Value]: 'value',
}

export class FirebaseRx {
  private _firebaseEvents: Observable<FirebaseEvent>;
  private _firebaseQuery: FirebaseQuery;

  constructor(firebaseQuery: string | FirebaseQuery, firebaseEvents: FirebaseEventType[]) {
    this._firebaseQuery = toFirebaseQuery(firebaseQuery);
    this._bindEvents(firebaseEvents);
  }

  get events(): Observable<FirebaseEvent> {
    return this._firebaseEvents;
  }

  ref() {
    return this._firebaseQuery.ref();
  }

  toString() {
    return this._firebaseQuery.toString();
  }

  private _bindEvents(events: FirebaseEventType[]) {
    this._firebaseEvents = Observable.create((observer: Observer<FirebaseEvent>) => {
      let callbacks = {};

      events.forEach(eventType => {
        callbacks[eventType] = this._firebaseQuery.on(FIREBASE_EVENT_NAME[eventType], (snapshot, prevChild) => {
          observer.next({ eventType: eventType, snapshot: snapshot, prevChild: prevChild });
        }, error => {
          observer.error(error);
        });
      });

      return () => {
        events.forEach(eventType => {
          this._firebaseQuery.off(FIREBASE_EVENT_NAME[eventType], callbacks[eventType]);
        });
      }
    });
  }
}
