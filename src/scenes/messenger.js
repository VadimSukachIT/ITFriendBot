import { Scenes, Markup } from 'telegraf';

import { FINAL_SCENE, MESSENGER_SCENE, MESSENGERS } from '../configs';
import { User } from '../models';

export const messengerScene = new Scenes.BaseScene(MESSENGER_SCENE);

messengerScene.enter(async (ctx) => {
  await ctx.reply(
    'Выберете мессенджер, в котором будет удобно связаться для обсуждения деталей:',
    Markup.inlineKeyboard([
      Markup.button.callback('Telegram', MESSENGERS.TELEGRAM),
      Markup.button.callback('Viber', MESSENGERS.VIBER),
    ]));
});

messengerScene.action(MESSENGERS.TELEGRAM, async (ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { messenger: MESSENGERS.TELEGRAM })

  return ctx.scene.enter(FINAL_SCENE, { email });
});

messengerScene.action(MESSENGERS.VIBER, async (ctx) => {
  const { email } = ctx.scene.state;

  await User.findOneAndUpdate({ email }, { speciality: MESSENGERS.VIBER })

  return ctx.scene.enter(FINAL_SCENE, { email });
});
