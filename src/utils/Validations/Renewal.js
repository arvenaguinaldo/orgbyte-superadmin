export const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'starts',
    'ends'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
