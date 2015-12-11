import { Pipe } from 'angular2/angular2'

import { QueryPipeTransform } from './query_pipe_transform'
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { toFirebaseQuery } from '../utils/to_firebase_query'

@Pipe({
  name: 'endAt',
})

export class EndAtPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: any[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('EndAt pipe requires the value to end at argument');
    }

    return toFirebaseQuery(firebaseQuery).endAt(args[0], args[1]);
  }
}
