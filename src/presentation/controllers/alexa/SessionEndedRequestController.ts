import { BaseController } from './BaseController';
import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { 
  AlexaRequest,
  AlexaResponse,
  RequestType,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class SessionEndedRequestController extends BaseController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly requestType: RequestType = 'SessionEndedRequest',
  ) {
    super();
  }

  async canHandle(input: AlexaRequest): Promise<boolean> {
    return this.sdk.request(input, null, this.requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {
    return this.sdk.response(input);
  }
}