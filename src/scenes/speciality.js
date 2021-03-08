import { Scenes, Markup } from 'telegraf';

import { NAME_SCENE, PARENT_NAME_SCENE, SPECIALITIES, SPECIALITY_SCENE } from '../configs';
import { User } from '../models';

export const specialityScene = new Scenes.BaseScene(SPECIALITY_SCENE);

specialityScene.enter(async (ctx) => {
  await ctx.reply('Выберите направление:', Markup.inlineKeyboard([
    Markup.button.callback('Scratch Jr (5-7 лет)', SPECIALITIES.JUNIOR),
    Markup.button.callback('Scratch Desktop (7-14 лет)', SPECIALITIES.DESKTOP),
  ]));
});

specialityScene.action(SPECIALITIES.JUNIOR, async (ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { speciality: SPECIALITIES.JUNIOR})

  await ctx.reply(`Для проведения пробного занятия понадобится планшет и приложение Skype. Пожалуйста, ответьте на несколько общих вопросов.`);

  return ctx.scene.enter(PARENT_NAME_SCENE, { email, speciality: SPECIALITIES.DESKTOP });
});

specialityScene.action(SPECIALITIES.DESKTOP, async(ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { speciality: SPECIALITIES.DESKTOP})
    .then(() => console.log('Специальность сохранена'))
    .catch((err) => console.log(err));

  await ctx.reply(`Отлично! Для проведения пробного занятия понадобится компьютер или ноутбук (планшет не подходит) и приложение Skype. Мы обучаем детей от 7 до 14 лет, ребёнок должен уметь читать на русском языке. Пожалуйста, ответьте на несколько общих вопросов.`);

  return ctx.scene.enter(PARENT_NAME_SCENE, { email, speciality: SPECIALITIES.DESKTOP });
});
