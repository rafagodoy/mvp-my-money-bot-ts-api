import { BaseController } from './BaseController';
import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { 
  AlexaRequest,
  AlexaResponse,
  RequestType,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class WelcomeIntentController extends BaseController implements AlexaVoiceController {
  
  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly translator: Translator,
    private readonly requestType: RequestType = 'IntentRequest',
    private readonly intentToMatch = 'WelcomeIntent',
  ) {
    super();
  }

  async canHandle(input: AlexaRequest): Promise<boolean> {
    return this.sdk.request(input, this.intentToMatch, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    const intentTriggered = await super.getIntentName(input);
    
    if (intentTriggered === this.intentToMatch) {
      const speechOutput = this.translator.byIntentName(intentTriggered);
      return this.sdk.response(input, speechOutput);
    }

    return this.sdk.response(input);
  }
}