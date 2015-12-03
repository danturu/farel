import { ChangeDetectorRef, Pipe } from 'angular2/angular2'

import { TerminalPipeTransform } from './terminal_pipe_transform'
import { toFirebaseQuery, isFirebaseQueryEqual } from '../utils/to_firebase_query'

@Pipe({
  name: 'onEvent', pure: false,
})

export class OnValuePipe implements TerminalPipeTransform {
  private _firebaseRef: FirebaseQuery = null;
  private _latestSnapshot: FirebaseDataSnapshot = null;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _contextOf: string = 'OnValuePipe') {
  }

  transform(firebaseRef: string | FirebaseQuery, args: any[] = []): FirebaseDataSnapshot {
    if (firebaseRef && !isFirebaseQueryEqual(firebaseRef, this._firebaseRef)) {
      this._subscribe(firebaseRef);
    }

    return this._latestSnapshot;
  }

  ngOnDestroy() {
    this._dispose();
  }

  private _subscribe(firebaseRef: string | FirebaseQuery) {
    this._dispose();
    this._firebaseRef = toFirebaseQuery(firebaseRef, this._contextOf);
    this._firebaseRef.on('value', this._updateLatestSnapshot, this);
  }

  private _dispose() {
    if (this._firebaseRef) {
      this._firebaseRef.off('value', this._updateLatestSnapshot, this);
    }

    this._firebaseRef = null;
    this._latestSnapshot = null;
  }

  private _updateLatestSnapshot(snapshot: FirebaseDataSnapshot) {
    this._latestSnapshot = snapshot;
    this._changeDetectorRef.markForCheck();
  }
}
