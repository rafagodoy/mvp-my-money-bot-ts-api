import { AlexaSkillSDK } from '@/adapters/voice-skills/protocols';
import { 
  AlexaRequest,
  AlexaResponse,
  AlexaVoiceController,
} from '@/presentation/protocols';

export class ErrorHandlerController implements AlexaVoiceController {

  constructor(
    private readonly sdk: AlexaSkillSDK,
  ) {
  }

  async canHandle(): Promise<boolean> {
    return true;
  }

  async handle(input: AlexaRequest, error): AlexaResponse {
    console.log(`~~~~ Error handled: ${error}`);
    return this.sdk.response(input, '', error);
  }
}