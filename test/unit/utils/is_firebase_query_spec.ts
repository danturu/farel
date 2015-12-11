import * as Firebase from 'firebase'

import { InvalidFirebaseQueryException } from '../../../farel/invalid_firebase_query_exception'
import { isFirebaseQuery } from '../../../farel/utils/is_firebase_query'

export function main(FIREBASE_URL: string) {
   describe('isFirebaseQuery', () => {
    it ('should pass when given a firebase instance', () => {
      expect(isFirebaseQuery(new Firebase(FIREBASE_URL))).toBe(true);
    });

    it ('should pass when given a firebase query instance', () => {
      expect(isFirebaseQuery(new Firebase(FIREBASE_URL).orderByValue())).toBe(true);
    });

    it ('should not pass otherwise', () => {
      expect(isFirebaseQuery(<any>{ ref: () => false })).toBe(false);
    });
  });
}
