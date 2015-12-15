import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skipWhile';

import { FirebaseRx, FirebaseEventType } from './firebase_rx';
import { unwrapToObjectWithMeta } from '../utils/unwrap_to_object_with_meta';

export class FirebaseRxArray extends FirebaseRx {
  private _collection: any[] = [];
  private _collectionEvents: Observable<any[]>

  constructor(firebaseQuery: string | FirebaseQuery) {
    super(firebaseQuery, [
      {
        eventType: FirebaseEventType.ChildAdded,
      },
      {
        eventType: FirebaseEventType.ChildChanged,
      },
      {
        eventType: FirebaseEventType.ChildMoved,
      },
      {
        eventType: FirebaseEventType.ChildRemoved,
      },
      {
        eventType: FirebaseEventType.Value,
        once: true,
      },
    ]);

    this._collectionEvents = this.events.skipWhile(callback => {
      switch(callback.eventType) {
        case FirebaseEventType.ChildAdded:
          this._childAdded(callback.snapshot, callback.prevChild);
          break;

        case FirebaseEventType.ChildChanged:
          this._childChanged(callback.snapshot);
          break;

        case FirebaseEventType.ChildMoved:
          this._childMoved(callback.snapshot, callback.prevChild);
          break;

        case FirebaseEventType.ChildRemoved:
          this._childRemoved(callback.snapshot);
          break;

        case FirebaseEventType.Value:
          return false;
      }

      return true;
    }).map(callback => this._collection);
  }

  get collectionEvents(): Observable<any[]>{
    return this._collectionEvents;
  }

  private _childAdded(snapshot: FirebaseDataSnapshot, prevChild: string) {
    this._collection.splice(this._nextChildIndex(prevChild), 0, unwrapToObjectWithMeta(snapshot));
  }

  private _childChanged(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._collection[index] = unwrapToObjectWithMeta(snapshot);
    }
  }

  private _childMoved(snapshot: FirebaseDataSnapshot, prevChild: string) {
    let currIndex = this._indexForChild(snapshot.key());

    if (currIndex > -1) {
      let movedChild = this._collection.splice(currIndex, 1)[0];
      let newIndex = this._nextChildIndex(prevChild);

      this._collection.splice(newIndex, 0, movedChild);
    }
  }

  private _childRemoved(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._collection.splice(index, 1)
    }
  }

  private _indexForChild(key: string): number {
    return this._collection.findIndex(child => child.$key === key);
  }

  private _nextChildIndex(key: string): number {
    if (!key) {
      return 0;
    }

    let index = this._indexForChild(key);

    if (index === -1) {
      return this._collection.length;
    } else {
      return index + 1;
    }
  }
}
