import { ChangeDetectorRef, Pipe } from 'angular2/core'
import { AsyncPipe } from 'angular2/common'

import { FirebaseRxArray } from '../../core/firebase_rx_array';
import { FirebaseAsync } from '../../core/firebase_async'
import { TerminalPipeTransform } from './terminal_pipe_transform';
import { isFirebaseRefsEqual } from '../../utils/is_firebase_refs_equal';
import { toFirebaseQuery } from '../../utils/to_firebase_query';

@Pipe({
  name: 'toArray', pure: false
})

export class ToArrayPipe implements TerminalPipeTransform {
  private _firebaseAsync: FirebaseAsync;
  private _firebaseQuery: FirebaseQuery;
  private _asyncPipe: AsyncPipe;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._asyncPipe = new AsyncPipe(changeDetectorRef);
  }

  transform(firebaseQuery: string | FirebaseQuery, args: any[] = []): any {
    if (!isFirebaseRefsEqual(this._firebaseQuery, firebaseQuery)) {
      this._firebaseQuery = toFirebaseQuery(firebaseQuery);

      if (firebaseQuery) {
        this._firebaseAsync = new FirebaseRxArray(firebaseQuery).collectionEvents;
      } else {
        this._firebaseAsync = Promise.resolve([]);
      }
    }

    return this._asyncPipe.transform(this._firebaseAsync);
  }

  ngOnDestroy() {
    this._asyncPipe.ngOnDestroy();
  }
}
