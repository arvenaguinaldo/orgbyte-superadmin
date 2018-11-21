export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'subject',
    'content'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  if (values.all_members) {
    values.first_year = false; //eslint-disable-line
    values.second_year = false; //eslint-disable-line
    values.third_year = false; //eslint-disable-line
    values.fourth_year = false; //eslint-disable-line
  }
  return errors;
};
