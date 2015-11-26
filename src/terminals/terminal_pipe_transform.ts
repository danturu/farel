import { PipeOnDestroy } from 'angular2/angular2'

export interface TerminalPipeTransform extends PipeOnDestroy {
  transform(firebaseRef: string, args: any[]): any;
  transform(firebaseRef: FirebaseQuery, args: any[]): any;
}
