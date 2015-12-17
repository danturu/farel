import { Pipe } from 'angular2/core';

import { FarelQuery } from '../../core/farel_ref';
import { FarelRecordAttr } from '../../core/farel_record';
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception';
import { QueryPipeTransform } from '../query_pipe_transform';

@Pipe({
  name: 'limitToLast',
})

export class LimitToLastPipe<T extends FarelRecordAttr> implements QueryPipeTransform<T> {
  transform(ref: FarelQuery<T>, args: any[]): FarelQuery<T> {
    if (!ref) return null;

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('LimitToLast pipe requires the limit argument');
    }

    return ref.chain(query => query.limitToLast(args[0]));
  }
}
