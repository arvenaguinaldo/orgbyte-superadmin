export const validate = (values) => {
  const errors = {};

  if (!/^(0|[0-9][0-9]{9})$/i.test(values.student_number)) {
    errors.student_number = 'Invalid Student Number, must be 10 digits';
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
