import { Scenes } from 'telegraf';

import { COUNTRY_SCENE, PHONE_SCENE } from '../configs';
import { User } from '../models';

export const countryScene = new Scenes.WizardScene(
  COUNTRY_SCENE,
  async (ctx) => {
    await ctx.reply('Введите страну проживания:')
    ctx.wizard.next();
  },
  async (ctx) => {
    const { text: country } = ctx.message;
    const { email } = ctx.scene.state;

    if (country) {
      await User.findOneAndUpdate({ email }, { country })
      await ctx.scene.enter(PHONE_SCENE, { email });
    } else {
      await ctx.reply('Пожалуйста, введите страну проживания корректно:')
      return;
    }
  }
)