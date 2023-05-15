import { GetStocksPriceUseCase, StocksEntity } from '@/domain/stocks';
import { GetStockPriceAPIResponse } from '@/adapters/apis/protocols/get-stock-price';
import { DateUtils } from '@/adapters/utils/protocols';
import { AlphaVantageAPI, GetStockPriceAPIRequest } from '@/adapters/apis/protocols';

export class GetStockPriceAdapter implements GetStocksPriceUseCase {

  constructor(
    private readonly api: AlphaVantageAPI,
    private readonly date: DateUtils,
  ) {}

  private stockPrice: number;

  private settings: GetStockPriceAPIRequest;

  private tradeDate: string;

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

  private setLastAvailableTradeDate() {
    this.tradeDate = this.date.getLastAvailable('EnUs');
  }

  private setTradeDate(tradeDate: StocksEntity.tradeDate) {
    if (tradeDate) {
      this.tradeDate = tradeDate.toString();
    }

    if (!tradeDate) {
      this.setLastAvailableTradeDate();
    }

    if (tradeDate && !this.date.isSameYearAsNow(tradeDate)) {
      this.tradeDate = this.date.setYearToNow(tradeDate, 'EnUs');
    }
  }

  private getTradeDate() {
    return this.tradeDate;
  }

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
    
    this.setTradeDate(tradeDate);
    this.setAPIRequest(codeName);
    
    const settings = this.getAPIRequest();
    const tradeDateString = this.getTradeDate();
    const responseAPI = await this.api.getStockPrice(settings);

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