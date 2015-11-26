import { ChangeDetectorRef, Pipe } from 'angular2/angular2'

import { TerminalPipeTransform } from './terminal_pipe_transform'
import { OnValuePipe } from './on_value_pipe'

@Pipe({
  name: 'numChildren', pure: false,
})

export class NumChildrenPipe implements TerminalPipeTransform {
  private _onValuePipe: OnValuePipe;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this._onValuePipe = new OnValuePipe(changeDetectorRef, 'NumChildrenPipe');
  }

  transform(firebaseRef: string | FirebaseQuery, args: any[] = []): number {
    let snapshot = this._onValuePipe.transform(firebaseRef);

    if (snapshot) {
      return snapshot.numChildren();
    } else {
      return 0;
    }
  }

  onDestroy() {
    this._onValuePipe.onDestroy();
  }
}
