import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export type AlexaRequest = HandlerInput;
export type AlexaResponse = Promise<Response>;
export type RequestType = 'LaunchRequest' | 'IntentRequest' | 'SessionEndedRequest';