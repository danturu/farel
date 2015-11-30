import { ChangeDetectorRef, Pipe } from 'angular2/angular2'

import { TerminalPipeTransform } from './terminal_pipe_transform'
import { OnValuePipe } from './on_value_pipe'
import { unwrapToObjectWithMeta } from '../utils/unwrap_to_object_with_meta'

@Pipe({
  name: 'toArray', pure: false
})

export class ToArrayPipe implements TerminalPipeTransform {
  private _onValuePipe: OnValuePipe;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._onValuePipe = new OnValuePipe(changeDetectorRef, 'ToArrayPipe');
  }

  transform(firebaseRef: string | FirebaseQuery, args: any[] = []): any {
    let snapshot = this._onValuePipe.transform(firebaseRef);

    if (snapshot) {
      return this._unwrapToArrayWithOrder(snapshot);
    } else {
      return null;
    }
  }

  onDestroy() {
    this._onValuePipe.onDestroy();
  }

  private _unwrapToArrayWithOrder(snapshot: FirebaseDataSnapshot) {
    var result: any[] = [];

    snapshot.forEach(child => {
      result.push(unwrapToObjectWithMeta(child));
    });

    return result;
  }
}
