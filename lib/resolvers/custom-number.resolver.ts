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
    const absoluteValue = Math.abs(number).toFixed(digits);

    // Divide o valor absoluto em parte inteira e decimal
    const [integerPart, decimalPart] = absoluteValue.split('.');

    // Formata a parte inteira com separador de milhares usando vírgulas
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );

    // Combina a parte inteira e decimal no formato esperado
    const formattedNumber = decimalPart
      ? `${before}${formattedIntegerPart},${decimalPart}${after}`
      : `${before}${formattedIntegerPart}${after}`;

    // Adiciona o sinal de negativo se necessário
    return isNegative ? `-${formattedNumber}` : formattedNumber;
  }
}
