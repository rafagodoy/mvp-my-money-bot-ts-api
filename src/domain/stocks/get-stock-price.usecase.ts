import { StocksEntity } from './stocks.entity';

export interface GetStocksPriceUseCase {
  getStockPrice(
    codeName: StocksEntity.codeName,
    priceStatus: StocksEntity.stockStatus,
    dateSerie: string,
  ): Promise<StocksEntity.price>
}