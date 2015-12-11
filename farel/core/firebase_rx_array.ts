import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FirebaseRx, FirebaseEventType } from './firebase_rx';
import { unwrapToObjectWithMeta } from '../utils/unwrap_to_object_with_meta';

export class FirebaseRxArray extends FirebaseRx {
  private _collection: any[] = [];
  private _collectionEvents: Observable<any[]>

  constructor(firebaseQuery: string | FirebaseQuery) {
    super(firebaseQuery, [FirebaseEventType.Added, FirebaseEventType.Changed, FirebaseEventType.Moved, FirebaseEventType.Removed]);
    this._bindCollectionEvents();
  }

  get collectionEvents(): Observable<any[]>{
    return this._collectionEvents;
  }

  private _bindCollectionEvents() {
    this._collectionEvents = this.events.map(callback => {
      switch(callback.eventType) {
        case FirebaseEventType.Added:
          return this._added(callback.snapshot, callback.prevChild);

        case FirebaseEventType.Changed:
          return this._changed(callback.snapshot);

        case FirebaseEventType.Moved:
          return this._moved(callback.snapshot, callback.prevChild);

        case FirebaseEventType.Removed:
          return this._removed(callback.snapshot);
      }
    });
  }

  private _added(snapshot: FirebaseDataSnapshot, prevChild: string) {
    this._collection.splice(this._indexAfter(prevChild), 0, unwrapToObjectWithMeta(snapshot));

    return this._collection;
  }

  private _changed(snapshot: FirebaseDataSnapshot) {
    let index = this._indexFor(snapshot.key());

    if (index > -1) {
      this._collection[index] = unwrapToObjectWithMeta(snapshot);
    }

    return this._collection;
  }

  private _moved(snapshot: FirebaseDataSnapshot, prevChild: string) {
    let currIndex = this._indexFor(snapshot.key());

    if (currIndex > -1) {
      let movingChild = this._collection.splice(currIndex, 1)[0];
      let newIndex = this._indexAfter(prevChild);

      this._collection.splice(newIndex, 0, movingChild);
    }

    return this._collection;
  }

  private _removed(snapshot: FirebaseDataSnapshot) {
    let index = this._indexFor(snapshot.key());

    if (index > -1) {
      this._collection.splice(index, 1)
    }

    return this._collection;
  }

  private _indexFor(key: string): number {
    return this._collection.findIndex(child => child.$key === key);
  }

  private _indexAfter(key: string): number {
    if (!key) {
      return 0;
    }

    let index = this._indexFor(key);

    if (index === -1) {
      return this._collection.length;
    } else {
      return index + 1;
    }
  }
}
