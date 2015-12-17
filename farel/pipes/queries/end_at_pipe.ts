import { Pipe } from 'angular2/core';

import { FarelQuery } from '../../core/farel_ref';
import { FarelRecordAttr } from '../../core/farel_record';
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception';
import { QueryPipeTransform } from '../query_pipe_transform';

@Pipe({
  name: 'endAt',
})

export class EndAtPipe<T extends FarelRecordAttr> implements QueryPipeTransform<T> {
  transform(ref: FarelQuery<T>, args: any[]): FarelQuery<T> {
    if (!ref) return null;

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('EndAt pipe requires at least one argument');
    }

    return ref.chain(query => query.endAt(args[0], args[1]));
  }
}
