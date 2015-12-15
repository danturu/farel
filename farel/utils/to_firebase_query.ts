import * as Firebase from 'firebase'

export function toFirebaseQuery(source: any): FirebaseQuery {
  return source.ref ? source : new Firebase(source);
}
