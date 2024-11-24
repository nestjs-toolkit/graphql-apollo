import { CustomNumberResolver } from '../lib/resolvers';

describe('CustomNumberResolver', () => {
  it('should be return with symbol', () => {
    const resolver = new CustomNumberResolver();

    expect(
      resolver.currency(-1234500.5, {
        digits: 2,
        before: '@',
        after: '#',
      }),
    ).toBe('-@1.234.500,50#');

    expect(
      resolver.currency(1234500.5, {
        digits: 2,
        before: '@',
        after: '#',
      }),
    ).toBe('@1.234.500,50#');

    expect(
      resolver.currency(-1500.5, {
        digits: 2,
        before: '@',
        after: '#',
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

  it('should be return with symbol', () => {
    const resolver = new CustomNumberResolver();

    const currencyFormat = (
      number: number,
      digits?: number,
      before?: string,
      after?: string,
    ): string => {
      return resolver.currency(number, { digits, after, before });
    };

    const tests = [
      { current: currencyFormat(123456.789,2), expected: '123.456,79' },
      { current: currencyFormat(123456.789, 0), expected: '123.457' }, // deve arredondar
      { current: currencyFormat(123456.489, 0), expected: '123.456' },
      { current: currencyFormat(123456.789, 4), expected: '123.456,7890' },
      { current: currencyFormat(-123456.789, 4), expected: '-123.456,7890' },
      {
        current: currencyFormat(123456.789, 4, '$', '#'),
        expected: '$123.456,7890#',
      },
      {
        current: currencyFormat(123456.789, 3, '$', '#'),
        expected: '$123.456,789#',
      },
      {
        current: currencyFormat(123456.789, 2, '$', '#'),
        expected: '$123.456,79#',
      },
      {
        current: currencyFormat(-123456.789, 2, '$', '#'),
        expected: '-$123.456,79#',
      },
      {
        current: currencyFormat(123456, 2, '$', '#'),
        expected: '$123.456,00#',
      },
      { current: currencyFormat(-555.12, 2, '$', '#'), expected: '-$555,12#' },
      { current: currencyFormat(-555.12, 0, '$', '#'), expected: '-$555#' },
      { current: currencyFormat(555.12, 0), expected: '555' },
      { current: currencyFormat(-555.12, 0), expected: '-555' },
      { current: currencyFormat(-555.12, 2), expected: '-555,12' },
      { current: currencyFormat(-555.12, 3), expected: '-555,120' },
      { current: currencyFormat('-555.12' as any, 3), expected: '-555,120' },
      { current: currencyFormat('a' as any, 3), expected: '0,000' },
    ];

    tests.forEach((test) => {
      expect(test.current).toBe(test.expected);
    });
  });
});
