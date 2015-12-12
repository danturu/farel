import { Pipe } from 'angular2/core'

import { InvalidPipeArgumentException } from '../../core/invalid_pipe_argument_exception'
import { QueryPipeTransform } from './query_pipe_transform'
import { toFirebaseQuery } from '../../utils/to_firebase_query'

@Pipe({
  name: 'limitToFirst',
})

export class LimitToFirstPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: number[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('LimitToFirst pipe requires the limit argument');
    }

    return toFirebaseQuery(firebaseQuery).limitToFirst(args[0]);
  }
}
