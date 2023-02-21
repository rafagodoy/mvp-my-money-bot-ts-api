import { StocksEntity } from '@/domain/stocks';

export interface GetStockNameSchema {
  companyName: StocksEntity.companyName;
}