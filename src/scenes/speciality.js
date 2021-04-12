import { Scenes, Markup } from 'telegraf';

import { NAME_SCENE, PARENT_NAME_SCENE, SPECIALITIES, SPECIALITY_SCENE } from '../configs';
import { User } from '../models';

export const specialityScene = new Scenes.BaseScene(SPECIALITY_SCENE);

specialityScene.enter(async (ctx) => {
  await ctx.reply('💡Выберите направление:\n' +
    'ScratchJr для детей от 5 до 7 лет.\n' +
    '\n' +
    'Scratch Desktop для детей от 8 до 12 лет.', Markup.inlineKeyboard([
    Markup.button.callback('ScratchJr', SPECIALITIES.JUNIOR),
    Markup.button.callback('Scratch Desktop', SPECIALITIES.DESKTOP),
  ]));
});

specialityScene.action(SPECIALITIES.JUNIOR, async (ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { speciality: SPECIALITIES.JUNIOR})

  await ctx.reply('📚Вы выбрали направление ScratchJr для детей от 5 до 7 лет!\n' +
    '\n' +
    'Для проведения пробного занятия:\n' +
    '\n' +
    '📌необходим планшет.\n' +
    '📌должно быть установлено приложение Skype. \n' +
    '📌ребёнок должен понимать русскую речь.');

  return ctx.scene.enter(PARENT_NAME_SCENE, { email, speciality: SPECIALITIES.JUNIOR });
});

specialityScene.action(SPECIALITIES.DESKTOP, async(ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { speciality: SPECIALITIES.DESKTOP})
    .then(() => console.log('Специальность сохранена'))
    .catch((err) => console.log(err));

  await ctx.reply('📚Вы выбрали направление Scratch Desktop для детей от 8 до 12 лет!\n' +
    '\n' +
    'Для проведения пробного занятия:\n' +
    '\n' +
    '📌необходим компьютер или ноутбук.\n' +
    '📌должно быть установлено приложение Skype. \n' +
    '📌ребёнок должен уметь читать на русском языке. \n' +
    '\n' +
    '💡Пожалуйста, ответьте на следующие вопросы:');

  return ctx.scene.enter(PARENT_NAME_SCENE, { email, speciality: SPECIALITIES.DESKTOP });
});
