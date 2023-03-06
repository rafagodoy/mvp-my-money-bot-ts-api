import {
  AlexaRequest,
  AlexaIntent,
} from '@/adapters/voice-skills/protocols';

export class BaseController {
  
  private intentObject = null;

  private setIntentObject(input: AlexaRequest) {
    const request = input.requestEnvelope.request as AlexaIntent;
    this.intentObject = request.intent;
  }

  private getIntentObject() {
    return this.intentObject;
  }

  async getIntentName(input: AlexaRequest): Promise<string> {

    this.setIntentObject(input);
    const intent = this.getIntentObject();

    const requestType = input.requestEnvelope.request.type;
    
    if (requestType === 'IntentRequest') {
      return intent.name;
    }
    return null;
  }
}