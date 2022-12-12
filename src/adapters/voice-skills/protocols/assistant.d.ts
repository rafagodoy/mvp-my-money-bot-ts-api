import { Answers } from '@/domain/interactions/answers.object';

export interface Assistant {
  getAnswer(intentName: Answers.IntentName): Answers.SpeechOutput
}