import { FarelQuery } from '../core/farel_ref';

export function isFarelEqual(lhs: FarelQuery<any>, rhs: FarelQuery<any>): boolean {
  return (!lhs && !rhs) || (lhs && rhs && lhs.toString() === rhs.toString());
}
