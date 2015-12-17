import { Pipe } from 'angular2/core';

import { FarelQuery } from '../../core/farel_ref';
import { FarelRecordAttr } from '../../core/farel_record';
import { QueryPipeTransform } from '../query_pipe_transform';

@Pipe({
  name: 'orderByKey',
})

export class OrderByKeyPipe<T extends FarelRecordAttr> implements QueryPipeTransform<T> {
  transform(ref: FarelQuery<T>, args: any[] = []): FarelQuery<T> {
    if (!ref) return null;

    return ref.chain(query => query.orderByKey());
  }
}
