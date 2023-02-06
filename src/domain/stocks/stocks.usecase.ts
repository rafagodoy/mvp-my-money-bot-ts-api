import { StocksEntity } from './stocks.entity';

export interface StocksUseCase {
  getStockPrice(
    codeName: StocksEntity.codeName,
    priceStatus: StocksEntity.stockStatus,
    dateSerie: string,
  ): Promise<StocksEntity.price>
}