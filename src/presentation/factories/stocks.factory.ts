import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { GetStockNameAdapter, GetStockPriceAdapter } from '@/adapters/apis';
import { DateAdapter } from '@/adapters/utils';
import { TradeDate } from '@/domain/stocks/value-objects';

export class StocksFactory {

  private readonly api = new AlphaVantage(
    new NodeFetch(),
  );

  private readonly date = new DateAdapter();

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