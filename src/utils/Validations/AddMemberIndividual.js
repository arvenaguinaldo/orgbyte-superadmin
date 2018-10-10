

export const validate = (values) => {
  const errors = {};

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Enter a valid email';
  }

  if (!/^(0|[1-9][0-9]{9})$/i.test(values.contact_number)) {
    errors.contact_number = 'Invalid phone number, must be 10 digits or not starting with 0';
  }

  if (!/^(0|[0-9][0-9]{9})$/i.test(values.student_number)) {
    errors.student_number = 'Invalid Student Number, must be 10 digits';
  }

  const requiredFields = [
    'student_number',
    'college_id',
    'last_name',
    'first_name',
    'middle_name',
    'email',
    'contact_number',
    'address',
    'year_level',
    'section',
    'group',
    'major',
    'semester'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'This field is Required';
    }
  });
  return errors;
};
