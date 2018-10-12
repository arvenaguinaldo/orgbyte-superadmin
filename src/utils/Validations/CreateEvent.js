export const validate = (values) => {
  const errors = {};

  const requiredFields = [
    'student_number',
    'venue',
    'starts',
    'ends',
    'description',
    'event_type',
    'ticket_price_type',
    'member_price',
    'non_member_price'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });

  if (values.non_members === false || !values.non_members) {
    values.non_member_price = null; //eslint-disable-line
    errors.non_member_price = null;
  }

  if (values.members === false || !values.members) {
    values.member_price = null; //eslint-disable-line
    errors.member_price = null;
  }

  if (values.ticket_price_type !== 'paid') {
    values.member_price = null; //eslint-disable-line
    errors.member_price = null;

    values.non_member_price = null; //eslint-disable-line
    errors.non_member_price = null;
  }

  // if (!values.non_members) {

  // }

  return errors;
};

export const warn = (values) => {
  const warnings = {};
  if (values.members === true && values.non_members === false) {
    warnings.non_member_price = 'University Wide Organization must not contain specific college';
  }
  return warnings;
};
