import { Pipe } from 'angular2/core'

import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { QueryPipeTransform } from '../query_pipe_transform'
import { toFirebaseQuery } from '../../utils/to_firebase_query'

@Pipe({
  name: 'orderByChild',
})

export class OrderByChildPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: string[]): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('OrderByChild pipe requires child the key argument');
    }

    return toFirebaseQuery(firebaseQuery).orderByChild(args[0]);
  }
}
