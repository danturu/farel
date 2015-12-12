import { Pipe } from 'angular2/core'

import { InvalidPipeArgumentException } from '../../core/invalid_pipe_argument_exception'
import { QueryPipeTransform } from './query_pipe_transform'
import { toFirebaseQuery } from '../../utils/to_firebase_query'

@Pipe({
  name: 'child',
})

export class ChildPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: string[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('Child pipe requires the key argument');
    }

    return toFirebaseQuery(firebaseQuery).ref().child(args[0]);
  }
}
