import * as Firebase from 'firebase'

import { InvalidFirebaseQueryException } from '../../../farel/invalid_firebase_query_exception'
import { toFirebaseQuery } from '../../../farel/utils/to_firebase_query'

export function main(FIREBASE_URL: string) {
  describe('toFirebaseQuery', () => {
    describe('when given a string', () => {
      it ('should return a firebase query', () => {
        expect(toFirebaseQuery(FIREBASE_URL)).toBeFirebaseQuery();
      });

      it ('should set the correct firebase url', () => {
        expect(toFirebaseQuery(FIREBASE_URL).toString()).toBe(FIREBASE_URL);
      });
    });

    describe('when given a firebase instance', () => {
      var firebase: Firebase;

      beforeEach(() => {
        firebase = new Firebase(FIREBASE_URL);
      });

      it ('should return a firebase query', () => {
        expect(toFirebaseQuery(firebase)).toBeFirebaseQuery();
      });

      it ('should not create a new firebase instance', () => {
        expect(toFirebaseQuery(firebase)).toBe(firebase);
      });
    });

    describe('when given a firebase query instance', () => {
      var firebaseQuery: FirebaseQuery;

      beforeEach(() => {
        firebaseQuery = new Firebase(FIREBASE_URL).orderByValue();
      });

      it ('should return a firebase query', () => {
        expect(toFirebaseQuery(firebaseQuery)).toBeFirebaseQuery();
      });

      it ('should not create a new firebase instance', () => {
        expect(toFirebaseQuery(firebaseQuery)).toBe(firebaseQuery);
      });
    });

    it ('should throw otherwise', () => {
      let transform = () => {
        toFirebaseQuery(<any>{ ref: () => false }, 'FirebasePipe');
      }

      expect(transform).toThrowError(InvalidFirebaseQueryException);
      expect(transform).toThrowError(/FirebasePipe/);
    });
  });
}
