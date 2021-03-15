import { Scenes } from 'telegraf';

import { FINAL_SCENE, SPECIALITIES } from '../configs';
import { User } from '../models';
import { saveUserRequestToGoogleDrive } from '../googleDrive';

export const finalScene = new Scenes.WizardScene(
  FINAL_SCENE,
  async (ctx) => {
    const { email } = ctx.scene.state;

    const user = await User.findOne({ email });

    if (user) {
      await saveUserRequestToGoogleDrive(user);
    }

    await ctx.reply('❗️На указанную Вами электронную почту придёт письмо с данными о возможных датах и времени проведения пробного занятия.\n' +
      '\n' +
      'Спасибо за запись!\n' +
      '\n' +
      'В ближайшее время мы с Вами свяжемся!')
    await ctx.scene.leave();
  },
)