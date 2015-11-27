import { Pipe } from 'angular2/angular2'

import { QueryPipeTransform } from './query_pipe_transform'
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { toFirebaseQuery } from '../utils/to_firebase_query'

@Pipe({
  name: 'equalTo',
})

export class EqualToPipe implements QueryPipeTransform {
  transform(firebaseRef: string | FirebaseQuery, args: any[]): FirebaseQuery {
    if (!firebaseRef) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('EndAt pipe requires the value to match for argument');
    }

    return toFirebaseQuery(firebaseRef).endAt(args[0], args[1]);
  }
}
