import { SPECIALITIES } from '../../configs';

export const validateAge = (age, speciality) => {
  switch (speciality) {
    case SPECIALITIES.JUNIOR: {
      return age && age >= 5 && age <= 7 ?
        {
          isValid: true,
          errorMessage: null,
        } : {
          isValid: false,
          errorMessage: 'Выбранное вами направление предназначено для детей от 5 до 7 лет.'
        }

    }
    case SPECIALITIES.DESKTOP: {
      return age && age >= 7 && age <= 14 ?
        {
          isValid: true,
          errorMessage: null,
        } : {
          isValid: false,
          errorMessage: 'Выбранное вами направление предназначено для детей от 7 до 14 лет.'
        }
    }
  }
}