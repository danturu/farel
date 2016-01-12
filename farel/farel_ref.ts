import { OpaqueToken, Injectable, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import * as Firebase from 'firebase';

import { FirebaseEmitter, FirebaseEventType } from './firebase_emitter';
import { FarelRecord, FarelRecordConstructor } from './farel_record';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skipWhile';

export const FAREL_BASE_URL: OpaqueToken = new OpaqueToken('farelBaseUrl');

@Injectable()
export class Farel {
  protected _ref: FirebaseQuery;

  constructor(@Inject(FAREL_BASE_URL) ref: string | FirebaseQuery) {
    this._ref = typeof ref === 'string' ? new Firebase(ref) : ref;
  }

  get ref(): Firebase {
    return this._ref.ref();
  }

  toString(): string {
    return this._ref.toString();
  }

  asObject<T extends FarelRecord>(query: (ref: Firebase) => FirebaseQuery, serializer: FarelRecordConstructor<T>): FarelObject<T> {
    return new FarelObject(query(this.ref), serializer);
  }

  asArray<T extends FarelRecord>(query: (ref: Firebase) => FirebaseQuery, serializer: FarelRecordConstructor<T>): FarelArray<T> {
    return new FarelArray(query(this.ref), serializer);
  }
}

export class FarelObject<T extends FarelRecord> extends Farel {
  private _emitter: Observable<T>;

  constructor(ref: FirebaseQuery, private _serializer: FarelRecordConstructor<T>) {
    super(ref);
    this._initEmitter();
  }

  subscribe(next?: Observer<T> | ((value: T[]) => void), error?: (error: any) => void, complete?: () => void): Subscription<T> {
    return this._emitter.subscribe(next, error, complete);
  }

  private _initEmitter() {
    let baseEmitter = new FirebaseEmitter(this._ref, [
      { eventType: FirebaseEventType.Value },
    ]);

    this._emitter = baseEmitter.emitter.map(callback =>
      this._serialize(callback.snapshot)
    );
  }

  private _serialize(snapshot: FirebaseDataSnapshot): T {
    return new this._serializer(snapshot);
  }
}

export class FarelArray<T extends FarelRecord> extends Farel {
  private _emitter: Observable<T[]>;
  private _list: T[] = [];

  constructor(ref: FirebaseQuery, private _serializer: FarelRecordConstructor<T>) {
    super(ref);
    this._initEmitter();
  }

  subscribe(next?: Observer<T[]> | ((value: T[]) => void), error?: (error: any) => void, complete?: () => void): Subscription<T[]> {
    return this._emitter.subscribe(next, error, complete);
  }

  private _initEmitter() {
    let baseEmitter = new FirebaseEmitter(this._ref, [
      { eventType: FirebaseEventType.ChildAdded },
      { eventType: FirebaseEventType.ChildChanged },
      { eventType: FirebaseEventType.ChildMoved },
      { eventType: FirebaseEventType.ChildRemoved },
      { eventType: FirebaseEventType.Value, emitOnce: true },
    ]);

    this._emitter = baseEmitter.emitter.do(callback => {
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

  private _serialize(snapshot: FirebaseDataSnapshot): T {
    return new this._serializer(snapshot);
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
