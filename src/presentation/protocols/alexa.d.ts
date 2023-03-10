import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest, Slot } from 'ask-sdk-model';

export type AlexaRequest = HandlerInput;
export type AlexaResponse = Promise<Response>;
export type RequestType = 'LaunchRequest' | 'IntentRequest' | 'SessionEndedRequest';
export type AlexaIntent = IntentRequest;
export type AlexaSlot = Slot;
export type Slots = {
  [name: string]: {
    value: string;
  };
};