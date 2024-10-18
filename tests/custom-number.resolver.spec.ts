import { CustomNumberResolver } from '../lib/resolvers';

describe('CustomNumberResolver', () => {
  it('should be return with symbol', () => {
    const resolver = new CustomNumberResolver();

    expect(
      resolver.currency(-1234500.5, {
        digits: 2,
        after: '@',
        before: '#',
      }),
    ).toBe('-@1.234.500,50#');

    expect(
      resolver.currency(1234500.5, {
        digits: 2,
        after: '@',
        before: '#',
      }),
    ).toBe('@1.234.500,50#');

    expect(
      resolver.currency(-1500.5, {
        digits: 2,
        after: '@',
        before: '#',
      }),
    ).toBe('-@1.500,50#');

    expect(
      resolver.currency(-1500.5, {
        digits: 2,
        after: '',
        before: '',
      }),
    ).toBe('-1.500,50');
  });
});
