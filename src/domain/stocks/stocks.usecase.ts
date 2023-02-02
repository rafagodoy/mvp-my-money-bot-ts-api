import { StocksEntity } from './stocks.entity';

export interface StocksUseCase {
  getAllPriceData(
    codeName: StocksEntity.codeName,
    priceStatus: StocksEntity.stockStatus
  ): StocksEntity.price
}