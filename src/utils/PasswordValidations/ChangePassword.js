export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'old_password',
    'new_password',
    'confirm_new_password'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  if (values.new_password !== values.confirm_new_password) {
    errors.confirm_new_password = null;
  }

  return errors;
};


export const warn = (values) => {
  const warnings = {};
  if (values.new_password !== values.confirm_new_password) {
    warnings.confirm_new_password = 'Passwords must be same';
  }
  if (/\s/.test(values.new_password)) {
    warnings.new_password = 'Spaces are not allowed';
  }
  if (/\s/.test(values.confirm_new_password)) {
    warnings.confirm_new_password = 'Spaces are not allowed';
  }
  return warnings;
};
