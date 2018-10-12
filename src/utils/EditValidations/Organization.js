export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'name',
    'organization_type_id',
    'organization_nature_id',
    'acronym',
    'recognition_number',
    'formation',
    'college_id'
    // 'selectedLogo',
    // 'color_theme'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  if (values.organization_type_id === 1) {
    values.college_id = null; //eslint-disable-line
    errors.college_id = null;
  }

  return errors;
};


export const warn = (values) => {
  const warnings = {};
  if (values.organization_type_id === 1) {
    warnings.college_id = 'University Wide Organization must not contain specific college';
  }
  return warnings;
};
