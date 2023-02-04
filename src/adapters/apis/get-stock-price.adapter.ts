import { StocksUseCase, StocksEntity } from '@/domain/stocks';
import { GetStockPriceAPIResponse } from '@/adapters/apis/protocols/get-stock-price';
import { AlphaVantageAPI, GetStockPriceAPIRequest } from '@/adapters/apis/protocols';

export class GetStockPrice implements StocksUseCase {

  constructor(
    private readonly api: AlphaVantageAPI,
  ) {}

  private stockPrice: number;

  private settings: GetStockPriceAPIRequest;

  private setStockPrice = {
    low: (stockData: GetStockPriceAPIResponse, dateSerie: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)'][dateSerie]['3. low']);
    },
    high: (stockData: GetStockPriceAPIResponse, dateSerie: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)'][dateSerie]['2. high']);
    },
    close: (stockData: GetStockPriceAPIResponse, dateSerie: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)'][dateSerie]['4. close']);
    },
  };

  getStockPrice() {
    return this.stockPrice;
  }

  private setAPIRequest(codeName: StocksEntity.codeName) {
    this.settings = {
      pathParams: '/query',
      queryParams: [
        {
          function: 'TIME_SERIES_DAILY_ADJUSTED',
        },
        {
          symbol: codeName,
        },
      ],
    };
  }

  private getAPIRequest() {
    return this.settings;
  }  

  async getAllPriceData(
    codeName: StocksEntity.codeName,
    stockStatus: StocksEntity.stockStatus,
    dateSerie: string,
  ): Promise<StocksEntity.price> {
    
    this.setAPIRequest(codeName);
    const settings = this.getAPIRequest();

    const responseAPI = await this.api.getStockPrice(settings);

    return this.setStockPrice[stockStatus](responseAPI, dateSerie);
  }
}