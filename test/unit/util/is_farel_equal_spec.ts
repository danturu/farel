import { Farel } from '../../../farel/core/farel_ref';
import { isFarelEqual } from '../../../farel/util/is_farel_equal';

export function main(firebaseUrl: string) {
  describe('isFarelEqual', () => {
    var lhs: Farel<any>;
    var rhs: Farel<any>;

    beforeEach(function() {
      lhs = new Farel('https://publicdata-weather.firebaseio.com');
      rhs = new Farel('https://publicdata-weather.firebaseio.com');
    });

    it ('should pass when the urls are equal', () => {
      expect(isFarelEqual(lhs, rhs)).toBe(true);
    });

    it ('should treat nulls as equal', () => {
      expect(isFarelEqual(null, null)).toBe(true);
    });

    it ('should not pass when one of the hands is null', () => {
      expect(isFarelEqual(null, rhs)).toBe(false);
      expect(isFarelEqual(lhs, null)).toBe(false);
    });

    it ('should not pass when urls are different', () => {
      expect(isFarelEqual(lhs.child('sanfrancisco'), rhs.child('newyork'))).toBe(false);
    });
  });
}
