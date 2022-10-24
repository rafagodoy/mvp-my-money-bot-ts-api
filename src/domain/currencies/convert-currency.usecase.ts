import { CurrenciesEntity } from '@/domain/currencies';

export interface ConvertCurrency {
  convert(token: string, params: CurrenciesEntity): Promise<number>
}