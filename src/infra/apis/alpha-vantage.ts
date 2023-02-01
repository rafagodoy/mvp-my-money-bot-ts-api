import { alphaVantage } from '@/config/apis';
import { API } from '@/infra/apis/protocols';
import {
  AlphaVantageAPI,
  GetStockPriceAPIRequest,
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
      pathParams: settings.pathParams,
      queryParams: [
        ...settings.queryParams,
        { 
          apikey: this.apiSecret,
        },
      ],
    });

    return response.body as GetStockPriceAPIResponse;
  }
}