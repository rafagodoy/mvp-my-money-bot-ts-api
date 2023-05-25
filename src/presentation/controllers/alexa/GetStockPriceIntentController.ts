import { GetStockPriceMessageParams } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { StockServiceProtocol } from '@/presentation/services/protocols';
import { GetStockPriceValidator } from '@/presentation/validation/protocols';
import { Slots } from '@/presentation/protocols';
import { BadRequestError } from '@/presentation/errors';

export class GetStockPriceIntentController {

  constructor(
    private readonly translator: Translator,
    private readonly validator: GetStockPriceValidator,
    private readonly stockService: StockServiceProtocol,
  ) { }

  async isValidRequest(inputCatched) {
    const {
      isValidTradeDate,
      isValidCompanyName,
    } = this.validator.validateAlexaInput(inputCatched);

    if (!isValidTradeDate) {
      throw new BadRequestError('isValidTradeDate');
    }

    if (!isValidCompanyName) {
      throw new BadRequestError('isValidCompanyName');
    }
  }

  async handle(slots: Slots): Promise<string> {

    const { companyName, tradeDate } = slots;

    const inputCatched = {
      companyName: companyName.value,
      tradeDate: tradeDate?.value,
    };

    await this.isValidRequest(inputCatched);

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