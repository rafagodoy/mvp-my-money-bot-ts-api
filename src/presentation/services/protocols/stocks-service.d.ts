import { StocksEntity } from '@/domain/stocks';

type StockDetails = {
  codeName: StocksEntity.codeName,
  price: StocksEntity.price
};

export interface StockServiceProtocol {
  getStockDetails(companyName: string, tradeDate: string): Promise<StockDetails>;
}