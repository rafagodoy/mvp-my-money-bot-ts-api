import {
  GetStockPriceAPIRequest,
  GetStockNameAPIRequest,
  GetStockNameAPIResponse,
  GetStockPriceAPIResponse,
} from '@/adapters/apis/protocols';

export interface AlphaVantageAPI {
  getStockPrice(settings: GetStockPriceAPIRequest): Promise<GetStockPriceAPIResponse>,
  getStockName(settings: GetStockNameAPIRequest): Promise<GetStockNameAPIResponse>
}