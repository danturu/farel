import * as Firebase from 'firebase'

import { InvalidFirebaseQueryGivenException } from '../../../src/utils/invalid_firebase_query_given_exception'
import { toFirebaseQuery, isFirebaseQuery, isFirebaseQueryEqual } from '../../../src/utils/to_firebase_query'

export function main(FIREBASE_URL: string) {
  describe("toFirebaseQuery", () => {
    describe("when source is a string", () => {
      it ("should return a firebase query", () => {
        expect(toFirebaseQuery(FIREBASE_URL)).toBeFirebaseQuery();
      });

      it ("should set the correct firebase url", () => {
        expect(toFirebaseQuery(FIREBASE_URL).toString()).toBe(FIREBASE_URL);
      });
    });

    describe("when source is a firebase instance", () => {
      var firebase: Firebase;

      beforeEach(() => {
        firebase = new Firebase(FIREBASE_URL);
      });

      it ("should return a firebase query", () => {
        expect(toFirebaseQuery(firebase)).toBeFirebaseQuery();
      });

      it ("should not create a new firebase instance", () => {
        expect(toFirebaseQuery(firebase)).toBe(firebase);
      });
    });

    describe("when source is a firebase query instance", () => {
      var firebaseQuery: FirebaseQuery;

      beforeEach(() => {
        firebaseQuery = new Firebase(FIREBASE_URL).orderByValue();
      });

      it ("should return a firebase query", () => {
        expect(toFirebaseQuery(firebaseQuery)).toBeFirebaseQuery();
      });

      it ("should not create a new firebase instance", () => {
        expect(toFirebaseQuery(firebaseQuery)).toBe(firebaseQuery);
      });
    });

    it ("should throw otherwise", () => {
      let transform = () => {
        toFirebaseQuery(<any>{ ref: () => false }, 'FirebasePipe');
      }

      expect(transform).toThrowError(InvalidFirebaseQueryGivenException);
      expect(transform).toThrowError(/FirebasePipe/);
    });
  });

  describe("isFirebaseQuery", () => {
    it ("should pass when source is a firebase instance", () => {
      expect(isFirebaseQuery(new Firebase(FIREBASE_URL))).toBe(true);
    });

    it ("should pass when source is a firebase query instance", () => {
      expect(isFirebaseQuery(new Firebase(FIREBASE_URL).orderByValue())).toBe(true);
    });

    it ("should not pass otherwise", () => {
      expect(isFirebaseQuery(<any>{ ref: () => false })).toBe(false);
    });
  });

  describe("isFirebaseQueryEqual", () => {
    it ("should pass when urls are equal", () => {
      expect(isFirebaseQueryEqual(FIREBASE_URL, FIREBASE_URL)).toBe(true);
      expect(isFirebaseQueryEqual(new Firebase(FIREBASE_URL), FIREBASE_URL)).toBe(true);
      expect(isFirebaseQueryEqual(new Firebase(FIREBASE_URL), new Firebase(FIREBASE_URL))).toBe(true);
    });

    it ("should not pass when one of the hands is null", () => {
      expect(isFirebaseQueryEqual(null, FIREBASE_URL)).toBe(false);
      expect(isFirebaseQueryEqual(FIREBASE_URL, null)).toBe(false);
    });

    it ("should not pass when urls are different", () => {
      expect(isFirebaseQueryEqual(FIREBASE_URL, `${FIREBASE_URL}/child`)).toBe(false);
    });
  });
}
