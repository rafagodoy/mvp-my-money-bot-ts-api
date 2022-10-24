import { CurrenciesEntity } from '@/domain/currencies';
import { ConvertCurrency } from '@/domain/currencies';
import { ConvertCurrencyAPI } from './protocols/convert-currency-api.protocols';

export class ApiConvertCurrencyAdapter implements ConvertCurrency {

  constructor(
    private readonly api: ConvertCurrencyAPI,
  ) {}

  convert(token: string, currenciesEntity: CurrenciesEntity): Promise<number> {
    const requestParams = {
      token,
      body: currenciesEntity,
    };

    return this.api.convert(requestParams);
  }
}