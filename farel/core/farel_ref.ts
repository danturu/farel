import { OpaqueToken, Injectable, Optional, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as Firebase from 'firebase';

import { FarelRecord, FarelRecordConstructor, FarelRecordAttr } from './farel_record';

export type FarelOptions<T extends FarelRecordAttr> = {
  useFactory?: FarelRecordConstructor<T> | FarelRecordConstructor<FarelRecord>;
}

export class FarelQuery<T extends FarelRecordAttr> {
  constructor(protected _ref: FirebaseQuery, protected _options?: FarelOptions<T>) {
    this._mergeOptions();
  }

  get options(): FarelOptions<T> {
    return this._options;
  }

  get ref(): FirebaseQuery {
    return this._ref;
  }

  toString(): string {
    return this.ref.toString();
  }

  chain(query: (ref: FirebaseQuery) => FirebaseQuery) {
    return new FarelQuery(query(this.ref), this._options);
  }

  protected _mergeOptions() {
    this._options = Object.keys(this._options || {}).reduce((options, key) => {
      options[key] = this._options[key]; return options;
    }, {
      useFactory: FarelRecord,
    });
  }
}

export const FAREL_BASE_URL: OpaqueToken = new OpaqueToken('farelBaseUrl');
export const FAREL_DEFAULT_OPTIONS: OpaqueToken = new OpaqueToken('farelDefaultOptions');

@Injectable()
export class Farel<T extends FarelRecordAttr> extends FarelQuery<T> {
  constructor(@Inject(FAREL_BASE_URL) ref: string | Firebase, @Optional() @Inject(FAREL_DEFAULT_OPTIONS) options?: FarelOptions<T>) {
    super(typeof ref === 'string' ? new Firebase(ref) : ref, options);
  }

  get ref(): Firebase {
    return this._ref.ref();
  }

  get key(): string {
    return this._ref.ref().key();
  }

  child(path: string, options?: FarelOptions<T>): Farel<T> {
    return new Farel(this.ref.child(path), options || this._options);
  }

  /* TODO: refactor */

  private _onAuth: Observable<FirebaseAuthData>;

  get onAuth(): Observable<FirebaseAuthData> {
    if (this._onAuth) {
      return this._onAuth;
    }

    this._onAuth = Observable.create((observer: Observer<FirebaseAuthData>) => {
      let authCallback = (authData: FirebaseAuthData) => {
        observer.next(authData);
      }

      this.ref.onAuth(authCallback);

      return () => {
        this.ref.offAuth(authCallback);
      }
    });

    return this._onAuth;
  }
}
