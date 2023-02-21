import { alphaVantage } from '@/config/apis';
import { API } from '@/infra/apis/protocols';
import {
  AlphaVantageAPI,
  GetStockPriceAPIRequest,
  GetStockNameAPIRequest,
  GetStockNameAPIResponse,
  GetStockPriceAPIResponse,
} from '@/adapters/apis/protocols';

export class AlphaVantage implements AlphaVantageAPI {
  private readonly urlAPI = alphaVantage.url;

  private readonly apiSecret = alphaVantage.apiSecret;

  constructor(
    private readonly nodeFetch: API,
  ) {}

  async getStockPrice(settings: GetStockPriceAPIRequest): Promise<GetStockPriceAPIResponse> {
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
  }

  async getStockName(settings: GetStockNameAPIRequest): Promise<GetStockNameAPIResponse> {
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
  }
}