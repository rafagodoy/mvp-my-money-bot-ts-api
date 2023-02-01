import { APIResponse } from '@/infra/apis/protocols/api';

export type GetStockPriceAPIRequest = {
  pathParams: string,
  queryParams: Array<unknown>
};

export interface AlphaVantageAPI {
  getStockPrice(settings: GetStockPriceAPIRequest): Promise<APIResponse>
}