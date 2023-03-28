import { StocksEntity } from '@/domain/stocks';
import { DateUtils } from '@/adapters/utils/protocols';

export class TradeDate {
  private value: StocksEntity.tradeDate;
  
  constructor(
    private readonly date: DateUtils,
  ) {
  }
  
  setValue(value: StocksEntity.tradeDate) {
    this.value = value;
  }

  getValue(): StocksEntity.tradeDate {
    return this.value;
  }
  
  isValid(date: Date): boolean {
    return this.date.isValid(date);
  }
}