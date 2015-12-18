import { AsyncPipe } from 'angular2/common'
import { ChangeDetectorRef, Pipe } from 'angular2/core'
import { Observable } from 'rxjs/Observable';

import { FarelQuery } from '../../core/farel_ref';
import { FarelRecordAttr } from '../../core/farel_record';
import { FirebaseEmitter, FirebaseEventType } from '../../core/firebase_emitter';
import { TerminalPipeTransform, nullObservable } from '../terminal_pipe_transform';
import { isFarelEqual } from '../../util/is_farel_equal';

import 'rxjs/add/operator/map';

@Pipe({
  name: 'toObject', pure: false,
})

export class ToObjectPipe<T extends FarelRecordAttr> implements TerminalPipeTransform<T> {
  private _asyncPipe: AsyncPipe;
  private _emitter: Observable<T>;
  private _ref: FarelQuery<T>;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._asyncPipe = new AsyncPipe(changeDetectorRef);
  }

  transform(ref: FarelQuery<T>, args: any[] = []): any {
    if (!isFarelEqual(this._ref, ref)) {
      this._ref = ref;

      if (ref) {
        this._emitter = new FirebaseEmitter(this._ref.ref, [{ eventType: FirebaseEventType.Value }]).callbacks.map(callback =>
          this._serialize(callback.snapshot)
        );
      } else {
        this._emitter = nullObservable;
      }
    }

    return this._asyncPipe.transform(this._emitter);
  }

  ngOnDestroy() {
    this._asyncPipe.ngOnDestroy();
  }

  private _serialize(snapshot: FirebaseDataSnapshot): T {
    return <T>new this._ref.factory(snapshot);
  }
}
