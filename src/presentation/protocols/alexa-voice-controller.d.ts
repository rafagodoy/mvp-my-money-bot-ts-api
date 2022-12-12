import { AlexaRequest, AlexaResponse } from './alexa';

export interface AlexaVoiceController {
  canHandle(input: AlexaRequest): Promise<boolean>,
  handle(input: AlexaRequest, error: any): AlexaResponse
}