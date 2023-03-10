import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { GetStockNameAdapter, GetStockPriceAdapter } from '@/adapters/apis';
import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { Speaker } from '@/adapters/interactions/speaker';
import { 
  GetStockPriceIntentController,
} from '@/presentation/controllers/alexa/GetStockPriceIntentController';

const nodeFetch = new NodeFetch();
const alphaVantage = new AlphaVantage(nodeFetch);
const getStockPriceAdapter = new GetStockPriceAdapter(alphaVantage);
const getStockNameAdapter = new GetStockNameAdapter(alphaVantage);
const speaker = new Speaker();
const sdk = new AlexaSkills();
const translator = new TranslatorAdapter(speaker);

const getStockPriceIntentController = new GetStockPriceIntentController(
  sdk,
  translator,
  getStockPriceAdapter,
  getStockNameAdapter,
);

export { getStockPriceIntentController };