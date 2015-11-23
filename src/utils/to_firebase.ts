import * as Firebase from 'firebase'

export const toFirebase = (firebaseUrl: string | Firebase): Firebase => {
  if (typeof firebaseUrl === 'string') {
    return new Firebase(firebaseUrl);
  } else {
    return new Firebase(firebaseUrl.toString());
  }
}
