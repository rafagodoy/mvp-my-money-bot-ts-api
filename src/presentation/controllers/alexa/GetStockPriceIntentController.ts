import { BaseController } from './BaseController';
import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
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
      const speechOutput = this.translator.byIntentName(intentCatched);
      return this.sdk.response(input, speechOutput);
    }
  }
}