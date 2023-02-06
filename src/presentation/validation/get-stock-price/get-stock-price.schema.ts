import { StocksEntity } from '@/domain/stocks';

export interface GetStockPriceSchema {
  codeName: StocksEntity.codeName;
  stockStatus: StocksEntity.stockStatus;
  tradeDate: StocksEntity.tradeDate;
}