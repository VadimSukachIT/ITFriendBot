import { Scenes } from 'telegraf';

import { NAME_SCENE, PARENT_NAME_SCENE } from '../configs';
import { User } from '../models';

export const parentNameScene = new Scenes.WizardScene(
  PARENT_NAME_SCENE,
  async (ctx) => {
    await ctx.reply('Введите ваше ФИО:')
    ctx.wizard.next();
  },
  async (ctx) => {
    const { email, speciality } = ctx.scene.state
    const { message } = ctx;

    if (message) {
      const { text: parentName } = message;

      if (parentName) {
        await User.findOneAndUpdate({ email }, { parentName })
        await ctx.scene.enter(NAME_SCENE, { email, speciality });
      } else {
        await ctx.reply('Пожалуйста, введите ФИО корректно:')
        return;
      }
    }
  }
)