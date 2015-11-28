import * as Firebase from 'firebase'

import { unwrapToObjectWithMeta } from '../../../src/utils/unwrap_to_object_with_meta'

export function main(FIREBASE_URL: string) {
  describe('unwrapToObjectWithMeta', () => {
    it('should return null when given null', () => {
      expect(unwrapToObjectWithMeta(null)).toBe(null);
    });

    it('should return null when given no data', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot(null, null, false);
      expect(unwrapToObjectWithMeta(snapshot)).toBe(null);
    });

    it('should wrap result when given a string', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('order', 'theropoda');
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'order', $ref: 'ref', $value: 'theropoda' });
    });

    it('should wrap result when given a number', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('length', 1.6);
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'length', $ref: 'ref', $value: 1.6 });
    });

    it('should wrap result when given a boolean', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('vanished', true);
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'vanished', $ref: 'ref', $value: true });
    });

    it('should assign key when given an array', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('scores', [1, 2, 3]);
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'scores', $ref: 'ref', $value: [1, 2, 3] });
    });

    it('should assign key when given an object', () => {
      let snapshot: FirebaseDataSnapshot = <any>new MockSnapshot('stegosaurus', { order: 'ornithischia', weight: 2500 });
      expect(unwrapToObjectWithMeta(snapshot)).toEqual({ $key: 'stegosaurus', $ref: 'ref', order: 'ornithischia', weight: 2500 });
    });
  });
}

class MockSnapshot {
  constructor(private _key: any, private _val: any, private _exists: boolean = true) {
  }

  key(): any {
    return this._key;
  }

  val(): any {
    return this._val;
  }

  ref(): any {
    return 'ref';
  }

  exists(): boolean {
    return this._exists;
  }
}
