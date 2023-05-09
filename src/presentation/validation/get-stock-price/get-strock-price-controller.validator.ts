import { GetStockPriceSchemaForAlexa } from './get-stock-price.schema';
import { StocksFactory } from '@/presentation/factories';
import { StocksEntity } from '@/domain/stocks';
import { 
  GetStockPriceValidator,
  GetStockPriceValidatorResponse,
} from '../protocols/get-stock-price-controller-validator';

export class GetStockPriceControllerValidator implements GetStockPriceValidator {

  private tradeDateValidator;

  constructor(
    private readonly stocks: StocksFactory,
  ) {
    this.start();
  }

  private start() {
    const validators = this.stocks.createValidators();
    this.tradeDateValidator = validators.tradeDate;
  }

  private isValidCompanyName(companyName: StocksEntity.companyName): boolean {
    return !!companyName;
  }

  private isValidTradeDate(tradeDate: string): boolean {
    const hasTradeDate = !!tradeDate;

    if (hasTradeDate) {
      return this.tradeDateValidator.isValid(tradeDate);
    }
    return true;
  }

  validateAlexaInput(input: GetStockPriceSchemaForAlexa): GetStockPriceValidatorResponse {
    return {
      isValidTradeDate: this.isValidTradeDate(input?.tradeDate),
      isValidCompanyName: this.isValidCompanyName(input?.companyName),
    };
  }
}