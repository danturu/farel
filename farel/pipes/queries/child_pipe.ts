import { Pipe } from 'angular2/core';

import { Farel } from '../../core/farel_ref';
import { FarelRecordAttr } from '../../core/farel_record';
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception';
import { QueryPipeTransform } from '../query_pipe_transform';

@Pipe({
  name: 'child',
})

export class ChildPipe<T extends FarelRecordAttr> implements QueryPipeTransform<T> {
  transform(ref: Farel<T>, args: any[]): Farel<T> {
    if (!ref) return null;

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('Child pipe requires the key argument');
    }

    return ref.child(args[0]);
  }
}
