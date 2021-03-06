import { Scenes } from 'telegraf';

import { FINAL_SCENE, SPECIALITIES } from '../configs';
import { User } from '../models';
import { saveUserRequestToGoogleDrive } from '../googleDrive';

export const finalScene = new Scenes.WizardScene(
  FINAL_SCENE,
  async (ctx) => {
    const { email } = ctx.scene.state;

    const user = await User.findOne({ email });

    await saveUserRequestToGoogleDrive(user);

    await ctx.reply('Спасибо за запись, с Вами свяжутся в ближайшее время!')
    await ctx.scene.leave();
  },
)