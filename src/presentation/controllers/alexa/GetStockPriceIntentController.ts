import { BaseController } from './BaseController';
import { AlexaSkillSDK, GetStockPriceMessageParams } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { StockServiceProtocol } from '@/presentation/services/protocols';
import { GetStockPriceValidator } from '@/presentation/validation/protocols';
import {
  AlexaRequest,
  AlexaResponse,
  RequestType,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class GetStockPriceIntentController extends BaseController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly translator: Translator,
    private readonly validator: GetStockPriceValidator,
    private readonly stockService: StockServiceProtocol,
    private readonly requestType: RequestType = 'IntentRequest',
    private readonly intentToMatch = 'GetStockPriceIntent',
  ) {
    super();
  }

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

  async canHandle(input: AlexaRequest): Promise<boolean> {
    return this.sdk.request(input, this.intentToMatch, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    const intentTriggered = await super.getIntentName(input);

    if (intentTriggered === this.intentToMatch) {

      const { companyName, tradeDate } = await super.getSlotsFromIntent(input);

      const inputCatched = {
        companyName: companyName.value,
        tradeDate: tradeDate.value,
      };

      const isValid = this.isValidRequest(inputCatched);

      if (!isValid) {
        const speechOutput = this.translator
          .byIntentName<GetStockPriceMessageParams>('ErrorFoundIntent');

        return this.sdk.response(input, speechOutput);
      }

      const { price } = await this.stockService.getStockDetails(
        inputCatched.companyName,
        inputCatched.tradeDate,
      );

      const messageParams = {
        companyName: companyName.value,
        price,
      };

      const speechOutput = this.translator
        .byIntentName<GetStockPriceMessageParams>(intentTriggered, messageParams);

      return this.sdk.response(input, speechOutput);
    }
  }
}