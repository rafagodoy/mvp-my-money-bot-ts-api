import { StocksFactory } from '@/presentation/factories';

export class StocksService {
  
  private codeNameUseCase;

  private priceUseCase;

  constructor(
    private readonly stocks: StocksFactory,
  ) {
    this.start();
  }

  private start() {
    const useCases = this.stocks.createUseCases();

    this.codeNameUseCase = useCases.codeName;
    this.priceUseCase = useCases.price;
  }

  async getStockDetails(companyName: string, tradeDate: string) {
    const codeName = await this.codeNameUseCase.getStockName(companyName);
    const price = await this.priceUseCase.getStockPrice(codeName, 'close', tradeDate);

    return {
      codeName,
      price,
    };
  }
}