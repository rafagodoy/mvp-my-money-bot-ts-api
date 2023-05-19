import { GetStockPriceMessageParams } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { StockServiceProtocol } from '@/presentation/services/protocols';
import { GetStockPriceValidator } from '@/presentation/validation/protocols';
import { Slots } from '@/presentation/protocols';

export class GetStockPriceIntentController {

  constructor(
    private readonly translator: Translator,
    private readonly validator: GetStockPriceValidator,
    private readonly stockService: StockServiceProtocol,
  ) { }

  async isValidRequest(inputCatched): Promise<boolean> {
    const {
      isValidTradeDate,
      isValidCompanyName,
    } = this.validator.validateAlexaInput(inputCatched);

    if (!isValidTradeDate || !isValidCompanyName) {
      return false;
    }

    return true;
  }

  async handle(slots: Slots): Promise<string> {

    const { companyName, tradeDate } = slots;

    const inputCatched = {
      companyName: companyName.value,
      tradeDate: tradeDate?.value,
    };

    const isValid = this.isValidRequest(inputCatched);

    if (!isValid) {
      return this.translator
        .byIntentName<GetStockPriceMessageParams>('ErrorFoundIntent');
    }

    const { price } = await this.stockService.getStockDetails(
      inputCatched.companyName,
      inputCatched.tradeDate,
    );

    const messageParams = {
      companyName: companyName.value,
      price,
    };

    return this.translator
      .byIntentName<GetStockPriceMessageParams>('GetStockPriceIntent', messageParams);
  }
}