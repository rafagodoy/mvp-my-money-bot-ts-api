import {
  AlexaSkillSDK,
  AlexaRequest,
  AlexaIntent,
  AlexaSlot,
  Slots,
} from '@/adapters/voice-skills/protocols';
import { Translator } from '@/domain/interactions';
import { AlexaResponse, RequestType } from '@/presentation/protocols';

export class AlexaHandlerController {
  
  constructor(
    private readonly sdk: AlexaSkillSDK,
    private readonly translator: Translator,
    private readonly GetStockPriceIntentController,
  ) {
  }

  private intentObject = null;

  private welcomeIntent = 'WelcomeIntent';

  private getOutputSpeech = {
    for: {
      WelcomeIntent: (): string => (
        this.translator.byIntentName(this.welcomeIntent)
      ),
      GetStockPriceIntent: (slots: Slots): string => (
        this.GetStockPriceIntentController.handle(slots)
      ),
    },
  };

  private setIntentObject(input: AlexaRequest) {
    const request = input.requestEnvelope.request as AlexaIntent;
    this.intentObject = request.intent;
  }

  private getIntentObject() {
    return this.intentObject;
  }

  getRequestType(input: AlexaRequest): RequestType {
    return input.requestEnvelope.request.type as RequestType;
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

    const slots: AlexaSlot = intent?.slots;

    return slots ? 
      Object.values(slots)
        .filter((slot) => slot.value !== undefined)
        .map(({ name, value }) => ({ [name as string]: { value } }))
        .reduce((acc, curr) => Object.assign(acc, curr), {}) 
      : null;
  }

  async canHandle(input: AlexaRequest): Promise<boolean> {

    const requestType = this.getRequestType(input);
    const intent = await this.getIntentName(input) || this.welcomeIntent;

    return this.sdk.request(input, intent, requestType);
  }

  async handle(input: AlexaRequest): AlexaResponse {

    const intent = await this.getIntentName(input) || this.welcomeIntent;
    const slots = await this.getSlotsFromIntent(input);

    const speechOutput = await this.getOutputSpeech.for[intent](slots);

    return this.sdk.response(input, speechOutput);    
  }
}