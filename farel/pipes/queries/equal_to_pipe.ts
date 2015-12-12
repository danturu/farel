import { Pipe } from 'angular2/core'

import { InvalidPipeArgumentException } from '../../core/invalid_pipe_argument_exception'
import { QueryPipeTransform } from './query_pipe_transform'
import { toFirebaseQuery } from '../../utils/to_firebase_query'

@Pipe({
  name: 'equalTo',
})

export class EqualToPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: any[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('EndAt pipe requires the value to match for argument');
    }

    return toFirebaseQuery(firebaseQuery).endAt(args[0], args[1]);
  }
}
