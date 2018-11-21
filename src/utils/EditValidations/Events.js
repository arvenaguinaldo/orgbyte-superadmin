export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'name',
    'venue',
    'starts',
    'ends',
    'description',
    'nature_of_event',
    'ticket_price_type',
    'members_price',
    'bulsuans_price',
    'non_bulsuans_price'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  if (values.members === false || !values.members) {
    values.members_price = null; //eslint-disable-line
    errors.members_price = null;
  }

  if (values.bulsuans === false || !values.bulsuans) {
    values.bulsuans_price = null; //eslint-disable-line
    errors.bulsuans_price = null;
  }

  if (values.non_bulsuans === false || !values.non_bulsuans) {
    values.non_bulsuans_price = null; //eslint-disable-line
    errors.non_bulsuans_price = null;
  }

  if (values.ticket_price_type !== 'paid') {
    values.members_price = null; //eslint-disable-line
    errors.members_price = null;

    values.bulsuans_price = null; //eslint-disable-line
    errors.bulsuans_price = null;

    values.non_bulsuans_price = null; //eslint-disable-line
    errors.non_bulsuans_price = null;
  }

  // if (!values.non_members) {

  // }

  // if (!values.members && !values.bulsuans && !values.non_bulsuans) {
  //   // errors.shirt_size.checkbox_group = 'This field is Required';
  // }

  return errors;
};

export const warn = (values) => {
  const warnings = {};
  if (values.members === false || !values.members) {
    warnings.members_price = 'Disabled';
  }

  if (values.bulsuans === false || !values.bulsuans) {
    warnings.bulsuans_price = 'Disabled';
  }

  if (values.non_bulsuans === false || !values.non_bulsuans) {
    warnings.non_bulsuans_price = 'Disabled';
  }

  if (values.ticket_price_type !== 'paid') {
    warnings.members_price = 'Disabled';
    warnings.bulsuans_price = 'Disabled';
    warnings.non_bulsuans_price = 'Disabled';
  }
  return warnings;
};
