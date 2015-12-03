import * as Firebase from 'firebase'

import { InvalidFirebaseQueryException } from '../invalid_firebase_query_exception'

export function toFirebaseQuery(source: string | FirebaseQuery, context?: any): FirebaseQuery {
  if (typeof source === 'string') {
    return new Firebase(source);
  }

  if (isFirebaseQuery(source)) {
    return source;
  }

  throw new InvalidFirebaseQueryException(context, source);
}

export function isFirebaseQuery(object: any): object is Firebase {
  return (object instanceof Firebase) || (typeof object.ref === 'function' && object.ref() instanceof Firebase);
}

export function isFirebaseQueryEqual(lhs: string | FirebaseQuery, rhs: string | FirebaseQuery): boolean {
  return (!lhs && !rhs) || (!!lhs && !!rhs && lhs.toString() === rhs.toString());
}
