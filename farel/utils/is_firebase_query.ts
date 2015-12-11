import * as Firebase from 'firebase'

export function isFirebaseQuery(object: any): object is Firebase {
  return (object instanceof Firebase) || (typeof object.ref === 'function' && object.ref() instanceof Firebase);
}
