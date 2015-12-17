export function main() {
  const MATCHERS: jasmine.CustomMatcherFactories = {}

  beforeEach(() => jasmine.addMatchers(MATCHERS));
}
