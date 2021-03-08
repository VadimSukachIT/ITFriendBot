import { Scenes } from 'telegraf';

import { AGE_SCENE, COUNTRY_SCENE } from '../configs';
import { User } from '../models';
import { validateAge } from '../utils';

export const ageScene = new Scenes.WizardScene(
  AGE_SCENE,
  async (ctx) => {
    await ctx.reply('Введите возраст ребенка:')
    ctx.wizard.next();
  },
  async (ctx) => {
    const { email, speciality } = ctx.scene.state;
    const { message } = ctx;

    if (message) {
      const { text: age } = message;

      const { isValid, errorMessage } = validateAge(age, speciality);

      if (isValid) {
        await User.findOneAndUpdate({ email }, { age })
        await ctx.scene.enter(COUNTRY_SCENE, { email });
      } else {
        await ctx.reply(`${ errorMessage } Пожалуйста, введите корректный возраст:`)
        return;
      }
    }
  }
)