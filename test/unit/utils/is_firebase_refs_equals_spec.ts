import * as Firebase from 'firebase'

import { InvalidFirebaseQueryException } from '../../../farel/invalid_firebase_query_exception'
import { isFirebaseRefsEqual } from '../../../farel/utils/is_firebase_refs_equal'

export function main(FIREBASE_URL: string) {
  describe('isFirebaseRefsEqual', () => {
    it ('should pass when the urls are equal', () => {
      expect(isFirebaseRefsEqual(FIREBASE_URL, FIREBASE_URL)).toBe(true);
      expect(isFirebaseRefsEqual(new Firebase(FIREBASE_URL), FIREBASE_URL)).toBe(true);
      expect(isFirebaseRefsEqual(new Firebase(FIREBASE_URL), new Firebase(FIREBASE_URL))).toBe(true);
    });

    it ('should treat nulls as equal', () => {
      expect(isFirebaseRefsEqual(null, null)).toBe(true);
    });

    it ('should not pass when one of the hands is null', () => {
      expect(isFirebaseRefsEqual(null, FIREBASE_URL)).toBe(false);
      expect(isFirebaseRefsEqual(FIREBASE_URL, null)).toBe(false);
    });

    it ('should not pass when urls are different', () => {
      expect(isFirebaseRefsEqual(FIREBASE_URL, `${FIREBASE_URL}/child`)).toBe(false);
    });
  });
}
