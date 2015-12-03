import { Pipe } from 'angular2/angular2'

import { QueryPipeTransform } from './query_pipe_transform'
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { toFirebaseQuery } from '../utils/to_firebase_query'

@Pipe({
  name: 'orderByChild',
})

export class OrderByChildPipe implements QueryPipeTransform {
  transform(firebaseRef: string | FirebaseQuery, args: string[]): FirebaseQuery {
    if (!firebaseRef) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('OrderByChild pipe requires child the key argument');
    }

    return toFirebaseQuery(firebaseRef).orderByChild(args[0]);
  }
}
