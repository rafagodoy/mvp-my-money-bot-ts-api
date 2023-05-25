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
    if (error.name && error.message) {
      console.error(
        `[ALEXA API ERROR] an error ${error.name} handled: ${error.message} 
      - From stack trace: ${error.stack}`,
      );
    }

    if (!error.message) {
      console.error(`[ALEXA API ERROR] an error handled from stack trace: ${error.stack}`);
    }

    return this.sdk.response(input, '', error);
  }
}