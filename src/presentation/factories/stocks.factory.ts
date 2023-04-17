import { AlphaVantageAPI } from '@/adapters/apis/protocols';
import { GetStockNameAdapter, GetStockPriceAdapter } from '@/adapters/apis';
import { DateAdapter } from '@/adapters/utils';
import { TradeDate } from '@/domain/stocks/value-objects';

export class StocksFactory {

  private readonly date = new DateAdapter();

  constructor(private readonly api: AlphaVantageAPI) {}

  createUseCases() {
    return {
      price: new GetStockPriceAdapter(this.api),
      codeName: new GetStockNameAdapter(this.api),
    };
  }

  createValidators() {
    return {
      tradeDate: new TradeDate(this.date),
    };
  }
}