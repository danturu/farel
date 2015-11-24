import * as Firebase from 'firebase'

export function toFirebase(firebaseUrl: string | Firebase): Firebase {
  return new Firebase(firebaseUrl.toString());
}
