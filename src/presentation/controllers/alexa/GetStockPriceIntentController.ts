import { BaseController } from './BaseController';
import { AlexaSkillSDK, GetStockPriceMessageParams } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { StockServiceProtocol } from '@/presentation/services/protocols';
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
    private readonly stockService: StockServiceProtocol,
    private readonly requestType: RequestType = 'IntentRequest',
    private readonly intentToMatch = 'GetStockPriceIntent',
  ) {
    super();
  }

  async canHandle(input: AlexaRequest): Promise<boolean> {
    return this.sdk.request(input, this.intentToMatch, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    const intentCatched = await super.getIntentName(input);

    if (intentCatched === this.intentToMatch) {

      const { companyName, tradeDate } = await super.getSlotsFromIntent(input);

      const { price } = await this.stockService.getStockDetails(companyName.value, tradeDate.value);

      const messageParams = {
        companyName: companyName.value,
        price,
      };

      const speechOutput = this.translator
        .byIntentName<GetStockPriceMessageParams>(intentCatched, messageParams);

      return this.sdk.response(input, speechOutput);
    }
  }
}