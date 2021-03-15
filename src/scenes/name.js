import { Scenes } from 'telegraf';

import { NAME_SCENE, AGE_SCENE } from '../configs';
import { User } from '../models';
import { isValidName } from '../utils';

export const nameScene = new Scenes.WizardScene(
  NAME_SCENE,
  async (ctx) => {
    await ctx.reply('Имя ребенка:')
    ctx.wizard.next();
  },
  async (ctx) => {
    const { email, speciality } = ctx.scene.state;
    const { message } = ctx;

    if (message) {
      const { text: name } = message;

      if (isValidName(name)) {
        await User.findOneAndUpdate({ email }, { name })
        await ctx.scene.enter(AGE_SCENE, { email, speciality });
      } else {
        await ctx.reply('Пожалуйста, введите имя ребенка корректно:')
        return;
      }
    }
  }
)