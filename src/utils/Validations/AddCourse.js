export const validate = (values) => {
  const errors = {};

  if (!/^[A-Z]*$/gm.test(values.course_code)) {
    errors.course_code = 'Invalid Acronym must be Uppercase';
  }
  const requiredFields = [
    'name',
    'college_id',
    'course_name',
    'course_code'
  ];


  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
