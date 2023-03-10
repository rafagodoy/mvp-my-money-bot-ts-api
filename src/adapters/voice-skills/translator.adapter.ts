import { Translator } from '@/domain/interactions';
import { Assistant } from '@/adapters/voice-skills/protocols';

export class TranslatorAdapter implements Translator {

  constructor(private readonly speaker: Assistant) {}

  private insertParamsOnMessage<T>(message: string, messageParams: T): string {
    return message.replace(
      /{([^}]+)}/g,
      (_, placeholder) => messageParams[placeholder],
    );
  }

  byIntentName<T>(intentName: string, messageParams?: T): string {
    const message = this.speaker.getAnswer(intentName);

    if (!messageParams) {
      return message;
    }

    return this.insertParamsOnMessage(message, messageParams);
  }
}