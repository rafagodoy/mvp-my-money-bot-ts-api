export type ConvertCurrencyAPIRequest = {
  token?: string,
  body: unknown,
};

export interface ConvertCurrencyAPI {
  convert(settings: ConvertCurrencyAPIRequest): Promise<number>
}