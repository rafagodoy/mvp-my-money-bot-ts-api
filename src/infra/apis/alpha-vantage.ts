import { 
  API,
  APIResponse,
  AlphaVantageAPI,
  GetStockPriceAPIRequest,
} from '@/infra/apis/protocols';

export class AlphaVantage implements AlphaVantageAPI {
  private readonly urlAPI = 'https://www.alphavantage.co';

  private readonly apiSecret: 'ACTIGGX76W5XGU8L';

  constructor(
    private readonly nodeFetch: API,
  ) {}

  async getStockPrice(settings: GetStockPriceAPIRequest): Promise<APIResponse> {
    return this.nodeFetch.get({
      url: this.urlAPI,
      pathParams: settings.pathParams,
      queryParams: [
        ...settings.queryParams,
        { 
          apikey: this.apiSecret,
        },
      ],
    });
  }
}