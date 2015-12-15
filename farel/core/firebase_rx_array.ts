import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

    this._collectionEvents = this.events.map(callback => {
      switch(callback.eventType) {
        case FirebaseEventType.ChildAdded:
          return this._childAdded(callback.snapshot, callback.prevChild);

        case FirebaseEventType.ChildChanged:
          return this._childChanged(callback.snapshot);

        case FirebaseEventType.ChildMoved:
          return this._childMoved(callback.snapshot, callback.prevChild);

        case FirebaseEventType.ChildRemoved:
          return this._childRemoved(callback.snapshot);

        case FirebaseEventType.Value:
          return this._collectionReady(callback.snapshot);
      }
    });
  }

  get collectionEvents(): Observable<any[]>{
    return this._collectionEvents;
  }

  private _childAdded(snapshot: FirebaseDataSnapshot, prevChild: string) {
    this._collection.splice(this._nextChildIndex(prevChild), 0, unwrapToObjectWithMeta(snapshot));

    return this._collection;
  }

  private _childChanged(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._collection[index] = unwrapToObjectWithMeta(snapshot);
    }

    return this._collection;
  }

  private _childMoved(snapshot: FirebaseDataSnapshot, prevChild: string) {
    let currIndex = this._indexForChild(snapshot.key());

    if (currIndex > -1) {
      let movedChild = this._collection.splice(currIndex, 1)[0];
      let newIndex = this._nextChildIndex(prevChild);

      this._collection.splice(newIndex, 0, movedChild);
    }

    return this._collection;
  }

  private _collectionReady(snapshot: FirebaseDataSnapshot) {
    return this._collection;
  }

  private _childRemoved(snapshot: FirebaseDataSnapshot) {
    let index = this._indexForChild(snapshot.key());

    if (index > -1) {
      this._collection.splice(index, 1)
    }

    return this._collection;
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
