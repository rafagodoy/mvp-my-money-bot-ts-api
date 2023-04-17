import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { StocksFactory } from '@/presentation/factories';
import { StocksService } from '@/presentation/services';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { Speaker } from '@/adapters/interactions/speaker';
import { 
  GetStockPriceIntentController,
} from '@/presentation/controllers/alexa/GetStockPriceIntentController';

const speaker = new Speaker();
const sdk = new AlexaSkills();
const nodeFetch = new NodeFetch();
const alphaVantage = new AlphaVantage(nodeFetch);

const translator = new TranslatorAdapter(speaker);
const stocksFactory = new StocksFactory(alphaVantage);
const stocksService = new StocksService(stocksFactory);

const getStockPriceIntentController = new GetStockPriceIntentController(
  sdk,
  translator,
  stocksService,
);

export { getStockPriceIntentController };