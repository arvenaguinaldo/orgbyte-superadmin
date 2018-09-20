export const validate = (values) => {
  const errors = {shirt: {}, shirt_size: {}};

  const {shirt = {}, shirt_size = {}} = values; // eslint-disable-line

  const requiredFields = [
    'name',
    'price',
    'description'
  ];

  if (!shirt_size.xxsmall && !shirt_size.xsmall && !shirt_size.small && !shirt_size.medium
    && !shirt_size.large && !shirt_size.xlarge && !shirt_size.xxxlarge && !shirt_size.xxxxlarge) {
    errors.shirt_size.checkbox_group = 'This field is Required';
  }

  requiredFields.forEach((field) => {
    if (!shirt[field]) {
      errors.shirt[field] = 'This field is Required';
    }
  });

  return errors;
};
