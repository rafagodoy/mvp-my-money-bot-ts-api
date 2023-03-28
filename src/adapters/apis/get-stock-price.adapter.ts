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
    low: (stockData: GetStockPriceAPIResponse, tradeDateString: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDateString]?.['3. low']);
    },
    high: (stockData: GetStockPriceAPIResponse, tradeDateString: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDateString]?.['2. high']);
    },
    close: (stockData: GetStockPriceAPIResponse, tradeDateString: string) => {
      this.stockPrice = Number(stockData['Time Series (Daily)']?.[tradeDateString]?.['4. close']);
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

  private async run(
    codeName: StocksEntity.codeName,
    stockStatus: StocksEntity.stockStatus,
    tradeDate: StocksEntity.tradeDate,
  ) {
    
    this.setAPIRequest(codeName);
    const settings = this.getAPIRequest();

    const responseAPI = await this.api.getStockPrice(settings);

    const tradeDateString: string = tradeDate.toISOString();

    this.setStockPrice[stockStatus](responseAPI, tradeDateString);
  }

  async getStockPrice(
    codeName: StocksEntity.codeName,
    stockStatus: StocksEntity.stockStatus,
    tradeDate: StocksEntity.tradeDate,
  ): Promise<StocksEntity.price> {
    await this.run(codeName, stockStatus, tradeDate);
    return this.stockPrice;
  }
}