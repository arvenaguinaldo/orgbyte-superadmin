

export const validate = (values) => {
  const errors = {requirements: {}, organization: {}, user: {}};

  const {requirements = {}, organization = {}, user = {}} = values;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.user.email = 'Enter a valid email';
  }

  if (!/^(0|[1-9][0-9]{9})$/i.test(user.contact_number)) {
    errors.user.contact_number = 'Invalid phone number, must be 10 digits or not starting with 0';
  }

  if (!/^[A-Z]*$/gm.test(organization.acronym)) {
    errors.organization.acronym = 'Invalid Acronym must be Uppercase';
  }

  const requiredFields = [
    'checkbox1',
    'checkbox2',
    'checkbox3',
    'checkbox4',
    'checkbox5',
    'checkbox6',
    'checkbox7',
    'checkbox8',
    'name',
    'organization_type_id',
    'organization_nature_id',
    'acronym',
    'recognition_number',
    'formation',
    'college_id',
    'last_name',
    'first_name',
    'middle_name',
    'email',
    'contact_number',
    // 'selectedLogo',
    'color_theme'
  ];

  requiredFields.forEach((field) => {
    if (!organization[field]) {
      errors.organization[field] = 'This field is Required';
    }
    if (!user[field]) {
      errors.user[field] = 'This field is Required';
    }
    if (!requirements[field]) {
      errors.requirements[field] = 'This field is Required';
    }
  });

  if ((organization.organization_type_id !== '1') && (organization.college_id != user.college_id)) { // eslint-disable-line
    errors.user.college_id = 'College must match the college of the organization';
  }

  if (organization.organization_type_id === '1') {
    organization.college_id = '';
    errors.organization.college_id = null;
  }

  return errors;
};


export const warn = (values) => {
  const {organization = {}} = values;
  const warnings = {organization: {}};
  if (organization.organization_type_id === '1') {
    warnings.organization.college_id = 'University Wide Organization must not contain specific college';
  }
  return warnings;
};
