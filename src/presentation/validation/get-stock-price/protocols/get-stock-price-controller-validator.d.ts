import { GetStockPriceSchemaForAlexa } from '../get-stock-price.schema';

export type GetStockPriceValidatorResponse = {
  isValidTradeDate: boolean,
  isValidCompanyName: boolean,
};

export interface GetStockPriceValidator {
  validateAlexaInput(input: GetStockPriceSchemaForAlexa): GetStockPriceValidatorResponse
}