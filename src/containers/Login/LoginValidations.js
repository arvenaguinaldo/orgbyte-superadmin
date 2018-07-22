import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errorMessage = {};
  const error = {};

  if (Validator.isEmpty(data.email)) {
    errorMessage.email = 'This field is required';
    error.email = true;
  }

  if (!Validator.isEmail(data.email)) {
    errorMessage.email = 'Enter a valid email';
    error.email = true;
  }

  if (Validator.isEmpty(data.password)) {
    errorMessage.password = 'This field is required';
    error.password = true;
  }

  return {
    error,
    errorMessage,
    isValid: isEmpty(errorMessage)
  };
}
