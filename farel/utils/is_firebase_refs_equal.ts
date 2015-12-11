import { FirebaseRx } from '../core/firebase_rx';

export function isFirebaseRefsEqual(lhs: string | FirebaseQuery | FirebaseRx, rhs: string | FirebaseQuery | FirebaseRx): boolean {
  return (!lhs && !rhs) || (!!lhs && !!rhs && lhs.toString() === rhs.toString());
}
