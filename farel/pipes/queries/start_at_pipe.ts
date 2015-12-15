import { Pipe } from 'angular2/core'

import { QueryPipeTransform } from '../query_pipe_transform'
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { toFirebaseQuery } from '../../utils/to_firebase_query'

@Pipe({
  name: 'startAt',
})

export class StartAtPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: any[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('StartAt pipe requires the value to start at argument');
    }

    return toFirebaseQuery(firebaseQuery).startAt(args[0], args[1]);
  }
}
