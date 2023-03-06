import { getRequestType, getIntentName, escapeXmlCharacters } from 'ask-sdk-core';
import { 
  AlexaSkillSDK,
  AlexaRequest,
  AlexaResponse,
  RequestType,
} from '@/adapters/voice-skills/protocols';

export class AlexaSkills implements AlexaSkillSDK {

  private makeRequestBy = {
    LaunchRequest: (input: AlexaRequest): boolean => {
      return getRequestType(input.requestEnvelope) === 'LaunchRequest';
    },
    IntentRequest: (input:AlexaRequest, intentName: string): boolean => {
      return getRequestType(input.requestEnvelope) === 'IntentRequest'
      && getIntentName(input.requestEnvelope) === intentName;
    },
    SessionEndedRequest: (input: AlexaRequest): boolean => {
      return getRequestType(input.requestEnvelope) === 'SessionEndedRequest';
    },
  };

  async request(
    input: AlexaRequest,
    intentName: string,
    requestType: RequestType,
  ): Promise<boolean> {
    
    return this.makeRequestBy[requestType](input, intentName);
  }

  async response(input: AlexaRequest, speechText?: string): AlexaResponse {
    return speechText ? input.responseBuilder
      .speak(escapeXmlCharacters(speechText))
      .getResponse() :
      input.responseBuilder
        .getResponse();
  }
}