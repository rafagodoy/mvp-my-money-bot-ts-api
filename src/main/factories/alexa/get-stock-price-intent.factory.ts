import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { Speaker } from '@/adapters/interactions/speaker';
import { 
  GetStockPriceIntentController,
} from '@/presentation/controllers/alexa/GetStockPriceIntentController';

const speaker = new Speaker();
const sdk = new AlexaSkills();
const translator = new TranslatorAdapter(speaker);

const getStockPriceIntentController = new GetStockPriceIntentController(
  sdk,
  translator,
);

export { getStockPriceIntentController };