import * as Firebase from 'firebase'

import { unwrapToObjectWithMeta } from '../../../farel/utils/unwrap_to_object_with_meta'

export function main(FIREBASE_URL: string) {
  describe('unwrapToObjectWithMeta', () => {
    it('should thrown when given null', () => {
      expect(() => unwrapToObjectWithMeta(null)).toThrow();
    });

    it('should wrap result when given a string', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('order', 'theropoda', 'yJwzr');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'order', $ref: 'yJwzr', $value: 'theropoda' });
    });

    it('should wrap result when given a number', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('length', 1.6, 'B3gfo');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'length', $ref: 'B3gfo', $value: 1.6 });
    });

    it('should wrap result when given a boolean', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('vanished', true, 'zIZoy');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'vanished', $ref: 'zIZoy', $value: true });
    });

    it('should unwrap result when given an array', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('scores', [1, 2, 3], 'iGyIQ');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'scores', $ref: 'iGyIQ', $value: [1, 2, 3] });
    });

    it('should unwrap result when given an object', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('stegosaurus', { order: 'ornithischia', weight: 2500 }, 'oy6NG');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'stegosaurus', $ref: 'oy6NG', order: 'ornithischia', weight: 2500 });
    });
  });
}

class MockSnapshot {
  constructor(private _key: any, private _val: any, private _ref: any) {
  }

  key(): any {
    return this._key;
  }

  val(): any {
    return this._val;
  }

  ref(): any {
    return this._ref;
  }
}
