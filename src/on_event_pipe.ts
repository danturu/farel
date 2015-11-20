import { ChangeDetectorRef, WrappedValue, Pipe, PipeTransform, PipeOnDestroy } from 'angular2/angular2'
import * as Firebase from 'firebase'

@Pipe({
  name: 'onEvent',
  pure: false,
})

export class OnEvent implements PipeTransform, PipeOnDestroy {
  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  onDestroy() {
  }

  transform(value: string, args: string[]): any {
  }
}
