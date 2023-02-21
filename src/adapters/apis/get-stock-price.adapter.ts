import { GetStocksPriceUseCase, StocksEntity } from '@/domain/stocks';
import { GetStockPriceAPIResponse } from '@/adapters/apis/protocols/get-stock-price';
import { AlphaVantageAPI, GetStockPriceAPIRequest } from '@/adapters/apis/protocols';

export class GetStockPriceAdapter implements GetStocksPriceUseCase {

  constructor(
    private readonly api: AlphaVantageAPI,
  ) {}

  private stockPrice: number;

  private settings: GetStockPriceAPIRequest;

  private setStockPrice = {
    low: (stockData: GetStockPriceAPIResponse, tradeDate: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDate]?.['3. low']);
    },
    high: (stockData: GetStockPriceAPIResponse, tradeDate: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDate]?.['2. high']);
    },
    close: (stockData: GetStockPriceAPIResponse, tradeDate: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDate]?.['4. close']);
    },
  };

  private setAPIRequest(codeName: StocksEntity.codeName) {
    this.settings = {
      queryParams: [
        {
          symbol: codeName,
        },
      ],
    };
  }

  private getAPIRequest() {
    return this.settings;
  }  

  private async setStockData(
    codeName: StocksEntity.codeName,
    stockStatus: StocksEntity.stockStatus,
    tradeDate: StocksEntity.tradeDate,
  ) {
    
    this.setAPIRequest(codeName);
    const settings = this.getAPIRequest();

    const responseAPI = await this.api.getStockPrice(settings);

    this.setStockPrice[stockStatus](responseAPI, tradeDate);
  }

  async getStockPrice(
    codeName: StocksEntity.codeName,
    stockStatus: StocksEntity.stockStatus,
    tradeDate: StocksEntity.tradeDate,
  ): Promise<StocksEntity.price> {

    await this.setStockData(codeName, stockStatus, tradeDate);
    return this.stockPrice;
  }
}