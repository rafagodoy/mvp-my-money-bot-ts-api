import { StocksEntity } from './stocks.entity';

export interface StocksUseCase {
  getAllPriceData(
    codeName: StocksEntity.codeName,
    priceStatus: StocksEntity.stockStatus,
    dateSerie: string,
  ): Promise<StocksEntity.price>
}