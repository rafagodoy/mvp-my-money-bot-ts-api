import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { 
  AlexaRequest,
  AlexaResponse,
  RequestType,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class SessionEndedRequestController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly translator: Translator,
    private readonly requestType: RequestType = 'SessionEndedRequest',
  ) {}

  async canHandle(input: AlexaRequest): Promise<boolean> {
    const intentName = await this.sdk.getIntentName(input);

    return this.sdk.request(input, intentName, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    const intentName = await this.sdk.getIntentName(input);
    const speechOutput = this.translator.byIntentName(intentName);

    return this.sdk.response(input, speechOutput);
  }
}