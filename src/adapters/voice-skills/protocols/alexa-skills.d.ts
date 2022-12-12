import { AlexaRequest, AlexaResponse, RequestType } from '@/presentation/protocols';

export interface AlexaSkillSDK {
  getIntentName(input: AlexaRequest): Promise<string>,
  request(input: AlexaRequest, intentName: string, requestType: RequestType): Promise<boolean>,
  response(input: AlexaRequest, speechText: string, error?: any): AlexaResponse
}