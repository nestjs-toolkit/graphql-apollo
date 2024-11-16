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
    const isNegative = number < 0;
    const value = Number(Math.abs(number)) || 0;
    const format = Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: digits ?? 0,
      maximumFractionDigits: digits ?? 0,
    });

    const text = `${before || ''}${format}${after || ''}`;

    return isNegative ? `-${text}` : text;
  }
}
