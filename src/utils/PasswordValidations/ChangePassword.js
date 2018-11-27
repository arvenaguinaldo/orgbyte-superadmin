export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'old_password',
    'new_password',
    'password'
  ];

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(values.new_password)) {
    errors.new_password = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }

  if (values.new_password !== values.password) {
    errors.password = 'Passwords must be same';
  }

  if (/\s/.test(values.new_password)) {
    errors.new_password = 'Spaces are not allowed';
  }

  if (/\s/.test(values.password)) {
    errors.password = 'Spaces are not allowed';
  }

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  return errors;
};


export const warn = (values) => {
  const warnings = {};
  if (values.password && values.new_password !== values.password) {
    warnings.password = 'Passwords must be same';
  }

  if (values.new_password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(values.new_password)) {
    warnings.new_password = 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }

  if (/\s/.test(values.new_password)) {
    warnings.new_password = 'Spaces are not allowed';
  }
  if (/\s/.test(values.password)) {
    warnings.password = 'Spaces are not allowed';
  }
  return warnings;
};
