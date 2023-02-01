import { GetStockPriceAPIRequest, GetStockPriceAPIResponse } from './get-stock-price';

export interface AlphaVantageAPI {
  getStockPrice(settings: GetStockPriceAPIRequest): Promise<GetStockPriceAPIResponse>
}