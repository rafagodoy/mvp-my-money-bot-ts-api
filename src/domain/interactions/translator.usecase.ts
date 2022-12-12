import { Answers } from './answers.object';

export interface Translator {
  byIntentName(intentName: Answers.IntentName): Answers.SpeechOutput
}