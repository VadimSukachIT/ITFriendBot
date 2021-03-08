import { Scenes } from 'telegraf';

import { EMAIL_SCENE, SPECIALITY_SCENE } from '../configs';
import { isValidEmail } from '../utils';
import { User } from '../models';

export const emailScene = new Scenes.WizardScene(
  EMAIL_SCENE,
  async (ctx) => {
    await ctx.reply(
      `Вас приветствует онлайн-школа IT friend!\nУкажите почтовый адрес, на которую придёт письмо с данными о возможных датах и времени проведения пробного занятия и ссылкой на Skype преподавателя.
    `);
    ctx.wizard.next();
  },
  async (ctx) => {
    const { message } = ctx;
    if (message) {
      const { text: email } = message;

      if (!isValidEmail(email)) {
        await ctx.reply('Введенный вами почтовый адрес не валидный. Пожалуйста, введите корректный почтовый адрес.')
        return;
      }

      const user = await User.findOne({ email });

      if (user) {
        await ctx.reply('Введенный почтовый адрес уже зарегестрирован. Пожалуйста, введите другой почтовый адрес')
        return;
      }

      await User.create({ email })
        .then(() => console.log('User created!'))
        .catch((err) => console.log(err));

      return ctx.scene.enter(SPECIALITY_SCENE, { email });
    }
  },
)
