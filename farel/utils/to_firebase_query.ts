import * as Firebase from 'firebase'

import { InvalidFirebaseQueryException } from '../invalid_firebase_query_exception'
import { isFirebaseQuery } from './is_firebase_query'

export function toFirebaseQuery(source: string | FirebaseQuery, context?: any): FirebaseQuery {
  if (typeof source === 'string') {
    return new Firebase(source);
  }

  if (isFirebaseQuery(source)) {
    return source;
  }

  throw new InvalidFirebaseQueryException(context, source);
}
