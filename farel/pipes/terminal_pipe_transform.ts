import { OnDestroy } from 'angular2/core';

import { FarelQuery } from '../core/farel_ref';
import { FarelRecordAttr } from '../core/farel_record';

export interface TerminalPipeTransform<T extends FarelRecordAttr> extends OnDestroy {
  transform(ref: FarelQuery<T>, args: any[]): any;
}
