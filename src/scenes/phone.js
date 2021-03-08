import { Scenes } from 'telegraf';

import { MESSENGER_SCENE, PHONE_SCENE } from '../configs';
import { User } from '../models';

export const phoneScene = new Scenes.WizardScene(
  PHONE_SCENE,
  async (ctx) => {
    await ctx.reply('Введите номер телефона:')
    ctx.wizard.next();
  },
  async (ctx) => {
    const { email } = ctx.scene.state;
    const { message } = ctx;

    if (message) {
      const { text: phone } = message;

      if (phone) {
        await User.findOneAndUpdate({ email }, { phone })
        await ctx.scene.enter(MESSENGER_SCENE, { email });
      } else {
        await ctx.reply('Пожалуйста, введите номер телефона корректно:')
        return;
      }
    }
  }
)