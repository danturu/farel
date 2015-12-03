import { isFirebaseQuery } from '../../farel/utils/to_firebase_query'

export function main() {
  const MATCHERS: jasmine.CustomMatcherFactories = {}

  MATCHERS['toBeFirebaseQuery'] = (): jasmine.CustomMatcher => {
    return {
      compare: (actual: any): jasmine.CustomMatcherResult => {
        let result: jasmine.CustomMatcherResult = { pass: isFirebaseQuery(actual) };

        if (result.pass) {
          result.message = `Expected ${actual} not to be a FirebaseQuery`;
        } else {
          result.message = `Expected ${actual} to be a FirebaseQuery`;
        }

        return result;
      }
    }
  }

  beforeEach(() => jasmine.addMatchers(MATCHERS));
}
