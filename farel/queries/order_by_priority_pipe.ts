import { Pipe } from 'angular2/angular2'

import { QueryPipeTransform } from './query_pipe_transform'
import { toFirebaseQuery } from '../utils/to_firebase_query'

@Pipe({
  name: 'orderByPriority',
})

export class OrderByPriorityPipe implements QueryPipeTransform {
  transform(firebaseQuery: string | FirebaseQuery, args: string[] = []): FirebaseQuery {
    if (!firebaseQuery) {
      return null;
    }

    return toFirebaseQuery(firebaseQuery).orderByPriority();
  }
}
