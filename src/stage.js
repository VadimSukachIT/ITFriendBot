import { Scenes } from 'telegraf';

import {
  ageScene,
  nameScene,
  emailScene,
  specialityScene,
  countryScene,
  finalScene,
  phoneScene,
  messengerScene,
  parentNameScene,
} from './scenes';

export const stage = new Scenes.Stage([
  emailScene,
  ageScene,
  nameScene,
  specialityScene,
  countryScene,
  finalScene,
  phoneScene,
  messengerScene,
  parentNameScene,
]);

