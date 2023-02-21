import { StocksEntity } from './stocks.entity';

export interface GetStockNameUseCase {
  getStockName(
    codeName: StocksEntity.codeName,
  ): Promise<StocksEntity.companyName>
}