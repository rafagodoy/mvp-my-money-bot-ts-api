import { alphaVantage } from '@/config/apis';
import { API } from '@/infra/apis/protocols';
import {
  AlphaVantageAPI,
  GetStockPriceAPIRequest,
  GetStockNameAPIRequest,
  GetStockNameAPIResponse,
  GetStockPriceAPIResponse,
} from '@/adapters/apis/protocols';

import { GatewayTimeoutError, BadGatewayError } from '@/presentation/errors';

export class AlphaVantage implements AlphaVantageAPI {
  private readonly urlAPI = alphaVantage.url;

  private readonly apiSecret = alphaVantage.apiSecret;

  private readonly resourceName = 'AlphaVantageAPI';

  constructor(
    private readonly nodeFetch: API,
  ) {}

  private throwError(error) {
    
    const detais = JSON.stringify(error.details);
    
    if (error.status === 504) {
      throw new GatewayTimeoutError(this.resourceName, detais);
    }

    throw new BadGatewayError(this.resourceName, detais);
  }

  async getStockPrice(settings: GetStockPriceAPIRequest) {
    try {

      const response = await this.nodeFetch.get({
        url: this.urlAPI,
        pathParams: '/query',
        queryParams: [
          ...settings.queryParams,
          {
            function: 'TIME_SERIES_DAILY_ADJUSTED',
          },
          {
            apikey: this.apiSecret,
          },
        ],
      });

      return response.body as GetStockPriceAPIResponse;
    } catch (error) {
      this.throwError(error);
    }
  }

  async getStockName(settings: GetStockNameAPIRequest): Promise<GetStockNameAPIResponse> {
    try {
      const response = await this.nodeFetch.get({
        url: this.urlAPI,
        pathParams: '/query',
        queryParams: [
          ...settings.queryParams,
          {
            function: 'SYMBOL_SEARCH',
          },
          {
            apikey: this.apiSecret,
          },
        ],
      });

      return response.body as GetStockNameAPIResponse;
    } catch (error) {
      this.throwError(error);
    }
  }
}