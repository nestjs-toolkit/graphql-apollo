import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('CustomNumber')
export class CustomNumberResolver {
  @ResolveField()
  string(number: number): string {
    return number.toString();
  }

  @ResolveField()
  int(number: number): number {
    return parseInt(number.toString(), 0) || 0;
  }

  @ResolveField()
  float(number: number): number {
    return parseFloat(number.toString()) || 0;
  }

  @ResolveField()
  fixed(number: number, { digits }): string {
    return parseFloat(number.toString()).toFixed(digits);
  }

  @ResolveField()
  format(number: number, { digits, after, before }): string {
    return this.currencyFormat(number, digits, after, before);
  }

  @ResolveField()
  currency(number: number, { digits, after, before }): string {
    return this.currencyFormat(number, digits, after, before);
  }

  private currencyFormat(
    number: number,
    digits?: number,
    after?: string,
    before?: string,
  ): string {
    const negative = number < 0;
    const absoluteValue = Math.abs(number).toFixed(digits || 2);
    const [integerPart, decimalPart] = absoluteValue.split('.');

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );

    const formattedNumber = `${
      after || ''
    }${formattedIntegerPart},${decimalPart}${before || ''}`;

    if (negative) {
      return `-${formattedNumber}`;
    }

    return formattedNumber;
  }
}
