import { FarelQuery } from '../core/farel_ref';
import { FarelRecordAttr } from '../core/farel_record';

export interface QueryPipeTransform<T extends FarelRecordAttr> {
  transform(ref: FarelQuery<T>, args: any[]): FarelQuery<T>;
}
