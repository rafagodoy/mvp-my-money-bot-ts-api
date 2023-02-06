import { WelcomeIntentController } from '@/presentation/controllers/alexa/WelcomeIntentController';
import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { Speaker } from '@/adapters/interactions/speaker';

const speaker = new Speaker();
const sdk = new AlexaSkills();
const translator = new TranslatorAdapter(speaker);

const welcomeIntentController = new WelcomeIntentController(
  sdk,
  translator,
);

export { welcomeIntentController };