import { AlexaRequest, AlexaResponse, RequestType } from '@/presentation/protocols';

export interface AlexaSkillSDK {
  request(input: AlexaRequest, intentName: string, requestType: RequestType): Promise<boolean>,
  response(input: AlexaRequest, speechText?: string, error?: any): AlexaResponse
}