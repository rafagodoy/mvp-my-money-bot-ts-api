import { StocksEntity } from '@/domain/stocks';

export interface GetStockPriceSchemaForAPI {
  codeName: StocksEntity.codeName;
  stockStatus: StocksEntity.stockStatus;
  tradeDate: StocksEntity.tradeDate;
}

export interface GetStockPriceSchemaForAlexa {
  companyName: StocksEntity.companyName;
  tradeDate: string;
}