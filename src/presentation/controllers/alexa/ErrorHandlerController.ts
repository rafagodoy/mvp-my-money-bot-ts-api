import { BaseController } from './BaseController';
import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { 
  AlexaRequest,
  AlexaResponse,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class ErrorHandlerController extends BaseController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
  ) {
    super();
  }

  async canHandle(): Promise<boolean> {
    return true;
  }

  async handle(input: AlexaRequest, error): AlexaResponse {
    console.log(`~~~~ Error handled: ${error}`);
    return this.sdk.response(input, '', error);
  }
}