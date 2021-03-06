import {} from 'dotenv/config'
import { session, Telegraf } from 'telegraf';
import mongoose from 'mongoose'

import { DB, EMAIL_SCENE } from './configs';
import { stage } from './stage'
import { i18n } from './i18n'

const startServer = async () => {
  const app = new Telegraf(process.env.BOT_TOKEN)

  app.use(session());
  app.use(stage.middleware());
  app.use(i18n.middleware())

  await mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`Successfully connected with the database \n${DB}`)
  });

  app.start((ctx) => {
    ctx.scene.enter(EMAIL_SCENE);
  })

  app.launch()
}

startServer();
