import { ChangeDetectorRef, Pipe } from 'angular2/core'
import { AsyncPipe } from 'angular2/common'
import 'rxjs/add/operator/map';

import { FirebaseAsync } from '../../core/firebase_async'
import { FirebaseRx, FirebaseEventType } from '../../core/firebase_rx';
import { TerminalPipeTransform } from './terminal_pipe_transform';
import { isFirebaseRefsEqual } from '../../utils/is_firebase_refs_equal';
import { toFirebaseQuery } from '../../utils/to_firebase_query';

@Pipe({
  name: 'hasChildren', pure: false,
})

export class HasChildrenPipe implements TerminalPipeTransform {
  private _firebaseAsync: FirebaseAsync;
  private _firebaseQuery: FirebaseQuery;
  private _asyncPipe: AsyncPipe;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._asyncPipe = new AsyncPipe(changeDetectorRef);
  }

  transform(firebaseQuery: string | FirebaseQuery, args: any[] = []): number {
    if (!isFirebaseRefsEqual(this._firebaseQuery, firebaseQuery)) {
      this._firebaseQuery = toFirebaseQuery(firebaseQuery);

      if (firebaseQuery) {
        this._firebaseAsync = new FirebaseRx(firebaseQuery, [FirebaseEventType.Value]).events.map(event =>
          event.snapshot.hasChildren()
        );
      } else {
        this._firebaseAsync = Promise.resolve(false);
      }
    }

    return this._asyncPipe.transform(this._firebaseAsync);
  }

  ngOnDestroy() {
    this._asyncPipe.ngOnDestroy();
  }
}
