export const validate = (values) => {
  const errors = {};

  if (!/^20[0-9][0-9]{7}$/g.test(values.student_number)) {
    errors.student_number = 'Invalid Student Number, must be 10 digits or starts with 20';
  }

  const requiredFields = [
    'student_number'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
