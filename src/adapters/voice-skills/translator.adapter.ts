import { Translator } from '@/domain/interactions';
import { Assistant } from '@/adapters/voice-skills/protocols';

export class TranslatorAdapter implements Translator {

  constructor(private readonly speaker: Assistant) {}

  byIntentName(intentName: string): string {
    return this.speaker.getAnswer(intentName);
  }
}