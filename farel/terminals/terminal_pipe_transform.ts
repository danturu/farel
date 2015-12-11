import { OnDestroy } from 'angular2/angular2';

export interface TerminalPipeTransform extends OnDestroy {
  transform(firebaseQuery: string, args: any[]): any;
  transform(firebaseQuery: FirebaseQuery, args: any[]): any;
}
