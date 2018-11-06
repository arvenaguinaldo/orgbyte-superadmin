export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'title',
    'start',
    'ends',
    'content'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
