import { GetStockNameUseCase, StocksEntity } from '@/domain/stocks';
import { GetStockNameAPIResponse } from '@/adapters/apis/protocols';
import { AlphaVantageAPI, GetStockNameAPIRequest } from '@/adapters/apis/protocols';

export class GetStockNameAdapter implements GetStockNameUseCase {

  constructor(
    private readonly api: AlphaVantageAPI,
  ) {}

  private stockName: string | null;

  private settings: GetStockNameAPIRequest;

  private setStockNameByRegion(stockData: GetStockNameAPIResponse, region: string) {
    const wasFound = stockData.bestMatches.find((data) => data['4. region'] === region);
    this.stockName = wasFound ? wasFound['1. symbol'] : null;
  }

  private setAPIRequest(companyName: StocksEntity.companyName) {
    this.settings = {
      queryParams: [
        {
          keywords: companyName,
        },
      ],
    };
  }

  private getAPIRequest() {
    return this.settings;
  }  

  private async run(companyName: StocksEntity.companyName) {
    
    this.setAPIRequest(companyName);
    const settings = this.getAPIRequest();

    const responseAPI = await this.api.getStockName(settings);

    this.setStockNameByRegion(responseAPI, 'Brazil/Sao Paolo');
  }

  async getStockName(
    companyName: StocksEntity.companyName,
  ): Promise<StocksEntity.companyName> {

    await this.run(companyName);
    return this.stockName;
  }
}