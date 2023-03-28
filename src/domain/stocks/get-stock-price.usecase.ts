import { StocksEntity } from './stocks.entity';

export interface GetStocksPriceUseCase {
  getStockPrice(
    codeName: StocksEntity.codeName,
    priceStatus: StocksEntity.stockStatus,
    dateSerie: Date,
  ): Promise<StocksEntity.price>
}