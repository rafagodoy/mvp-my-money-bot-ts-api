import { BaseController } from './BaseController';
import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { 
  AlexaRequest,
  AlexaResponse,
  RequestType,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class LaunchRequestController extends BaseController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly translator: Translator,
    private readonly intentName = 'WelcomeIntent',
    private readonly requestType: RequestType = 'LaunchRequest',
  ) {
    super();
  }

  async canHandle(input: AlexaRequest): Promise<boolean> {
    return this.sdk.request(input, this.intentName, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    const speechOutput = this.translator.byIntentName(this.intentName);
    return this.sdk.response(input, speechOutput);
  }
}