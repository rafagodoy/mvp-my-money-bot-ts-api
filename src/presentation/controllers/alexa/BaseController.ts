import {
  AlexaRequest,
  AlexaIntent,
  AlexaSlot,
  Slots,
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

  async getSlotsFromIntent(input: AlexaRequest): Promise<Slots> {

    this.setIntentObject(input);
    const intent = this.getIntentObject();

    const slots: AlexaSlot = intent.slots;

    return Object.values(slots)
      .filter((slot) => slot.value !== undefined)
      .map(({ name, value }) => ({ [name as string]: { value } }))
      .reduce((acc, curr) => Object.assign(acc, curr), {});
  }
}