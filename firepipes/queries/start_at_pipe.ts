import { Pipe } from 'angular2/angular2'

import { QueryPipeTransform } from './query_pipe_transform'
import { InvalidPipeArgumentException } from '../invalid_pipe_argument_exception'
import { toFirebaseQuery } from '../utils/to_firebase_query'

@Pipe({
  name: 'startAt',
})

export class StartAtPipe implements QueryPipeTransform {
  transform(firebaseRef: string | FirebaseQuery, args: any[]): FirebaseQuery {
    if (!firebaseRef) {
      return null;
    }

    if (!args || args.length == 0) {
      throw new InvalidPipeArgumentException('StartAt pipe requires the value to start at argument');
    }

    return toFirebaseQuery(firebaseRef).startAt(args[0], args[1]);
  }
}
