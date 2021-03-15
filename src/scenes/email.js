import { Scenes } from 'telegraf';

import { EMAIL_SCENE, SPECIALITY_SCENE } from '../configs';
import { isValidEmail } from '../utils';
import { User } from '../models';

export const emailScene = new Scenes.WizardScene(
  EMAIL_SCENE,
  async (ctx) => {
    await ctx.reply('🤓Вас приветствует онлайн-школа программирования IT FRIEND!\n' +
      '\n' +
      'Укажите адрес Вашей электронной почты:');
    ctx.wizard.next();
  },
  async (ctx) => {
    const { message } = ctx;
    if (message) {
      const { text: email } = message;

      if (!isValidEmail(email)) {
        await ctx.reply('Вы ввели некорректный адрес электронной почты, пожалуйста, попробуйте ещё раз!')
        return;
      }

      const user = await User.findOne({ email });

      if (user) {
        await ctx.reply('Введенный вами адрес электронной почты уже используется. Попробуйте еще раз!')
        return;
      }

      await User.create({ email })
        .then(() => console.log('User created!'))
        .catch((err) => console.log(err));

      return ctx.scene.enter(SPECIALITY_SCENE, { email });
    }
  },
)
