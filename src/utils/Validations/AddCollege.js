export const validate = (values) => {
  const errors = {};

  if (!/^[A-Z]*$/gm.test(values.college_code)) {
    errors.college_code = 'Invalid Acronym must be Uppercase';
  }
  const requiredFields = [
    'name',
    'college_code'
  ];


  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
