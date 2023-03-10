import { Answers } from './answers.object';

export interface Translator {
  byIntentName<T>(intentName: Answers.IntentName, messageParams?: T): Answers.SpeechOutput
}