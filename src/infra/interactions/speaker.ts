import message from './pt-BR.json';
import { Answers } from '@/adapters/voice-skills/protocols';
import { Assistant } from '@/adapters/voice-skills/protocols';

export class Speaker implements Assistant {
  getAnswer(intentName: Answers.IntentName): Answers.SpeechOutput {
    return message[intentName];
  }
}