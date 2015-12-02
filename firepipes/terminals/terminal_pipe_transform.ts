import { OnDestroy } from 'angular2/angular2'

export interface TerminalPipeTransform extends OnDestroy {
  transform(firebaseRef: string, args: any[]): any;
  transform(firebaseRef: FirebaseQuery, args: any[]): any;
}
