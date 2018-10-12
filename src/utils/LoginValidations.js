import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Enter a valid email';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
