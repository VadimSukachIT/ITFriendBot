import { Schema, model } from 'mongoose';

import { MESSENGERS, SPECIALITIES } from '../configs';

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  parentName: String,
  phone: String,
  age: Number,
  country: String,
  messenger: {
    type: String,
    enum: [MESSENGERS.TELEGRAM, MESSENGERS.VIBER, MESSENGERS.WHATSAPP],
  },
  speciality: {
    type: String,
    enum: [SPECIALITIES.JUNIOR, SPECIALITIES.DESKTOP],
  },
})


export const User = model('User', UserSchema);

