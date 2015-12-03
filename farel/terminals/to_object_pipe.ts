import { ChangeDetectorRef, Pipe } from 'angular2/angular2'

import { TerminalPipeTransform } from './terminal_pipe_transform'
import { OnValuePipe } from './on_value_pipe'
import { unwrapToObjectWithMeta } from '../utils/unwrap_to_object_with_meta'

@Pipe({
  name: 'toObject', pure: false,
})

export class ToObjectPipe implements TerminalPipeTransform {
  private _onValuePipe: OnValuePipe;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._onValuePipe = new OnValuePipe(changeDetectorRef, 'ToObjectPipe');
  }

  transform(firebaseRef: string | FirebaseQuery, args: any[] = []): any {
    return unwrapToObjectWithMeta(this._onValuePipe.transform(firebaseRef));
  }

  ngOnDestroy() {
    this._onValuePipe.ngOnDestroy();
  }
}
