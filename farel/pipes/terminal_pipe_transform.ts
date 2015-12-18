import { Observable } from 'rxjs/Observable';
import { OnDestroy } from 'angular2/core';

import { FarelQuery } from '../core/farel_ref';
import { FarelRecordAttr } from '../core/farel_record';

import 'rxjs/add/observable/fromArray';

export interface TerminalPipeTransform<T extends FarelRecordAttr> extends OnDestroy {
  transform(ref: FarelQuery<T>, args: any[]): any;
}

export const nullObservable = Observable.of(null);
