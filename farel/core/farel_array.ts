import { Observable } from 'rxjs/Observable';

import { FarelQuery } from './farel_ref';
import { FarelRecordAttr } from './farel_record';
import { FirebaseEmitter, FirebaseEventInstruction, FirebaseEventType } from './firebase_emitter';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skipWhile';

const CHILD_EVENTS: FirebaseEventInstruction[] = [
  { eventType: FirebaseEventType.ChildAdded },
  { eventType: FirebaseEventType.ChildChanged },
  { eventType: FirebaseEventType.ChildMoved },
  { eventType: FirebaseEventType.ChildRemoved },
]

export class FarelArray<T extends FarelRecordAttr> {
  private _list: T[] = [];
  private _changes: Observable<T[]>;

  constructor(private _ref: FarelQuery<T>) {
    let emitter = new FirebaseEmitter(this._ref.ref, CHILD_EVENTS.concat({ eventType: FirebaseEventType.Value, emitOnce: true }));

    this._changes = emitter.callbacks.do(callback => {
      switch(callback.eventType) {
        case FirebaseEventType.ChildAdded:
          return this._childAdded(callback.snapshot, callback.prevChild);

        case FirebaseEventType.ChildChanged:
          return this._childChanged(callback.snapshot);

        case FirebaseEventType.ChildMoved:
          return this._childMoved(callback.snapshot, callback.prevChild);

        case FirebaseEventType.ChildRemoved:
          return this._childRemoved(callback.snapshot);
      }
    }).skipWhile(callback => callback.eventType !== FirebaseEventType.Value).map(callback => this._list);
  }

  get changes(): Observable<T[]>{
    return this._changes;
  }

  private _serialize(snapshot: FirebaseDataSnapshot): T {
    return <T>new this._ref.options.useFactory(snapshot);
  }

  private _childAdded(snapshot: FirebaseDataSnapshot, prevChild: string) {
    let index = this._nextChildIndex(prevChild);
    let child = this._serialize(snapshot);

    this._list.splice(index, 0, child);
  }

  private _childChanged(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._list[index] = this._serialize(snapshot);
    }
  }

  private _childMoved(snapshot: FirebaseDataSnapshot, prevChild: string) {
    let currIndex = this._indexForChild(snapshot.key());

    if (currIndex > -1) {
      let child = this._list.splice(currIndex, 1)[0];
      let newIndex = this._nextChildIndex(prevChild);

      this._list.splice(newIndex, 0, child);
    }
  }

  private _childRemoved(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._list.splice(index, 1)
    }
  }

  private _indexForChild(key: string): number {
    return this._list.findIndex(child => child.$key === key);
  }

  private _nextChildIndex(key: string): number {
    if (!key) return 0;

    let index = this._indexForChild(key);

    if (index === -1) {
      return this._list.length;
    } else {
      return index + 1;
    }
  }
}
