import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  const csvKeys = Object.keys(data[0]);

  if (!csvKeys.includes('student_number') || !csvKeys.includes('last_name') || !csvKeys.includes('first_name')
  || !csvKeys.includes('middle_name') || !csvKeys.includes('course') || !csvKeys.includes('section')
  || !csvKeys.includes('group') || !csvKeys.includes('year_level') || !csvKeys.includes('email') || !csvKeys.includes('contact_number')
  || !csvKeys.includes('size')) {
    errors[0] = 'Invalid CSV format';
  } else {

    for (let i = 0; i < data.length; i += 1) {
      if (!/^20[0-9][0-9]{7}$/g.test(data[i].student_number) && data[i].student_number) {
        errors[i] = `Invalid Student Number, must be 10 digits or starts with 20 in row ${i + 2}`;
        console.log(errors[i]);
      }

      if (!/^[A-Z]*$/gm.test(data[i].size) && data[i].size) {
        errors[i] = `Invalid Size, must be a Character or Uppercase in row ${i + 2}`;
      }

      if (data[i].student_number === '') {
        errors[i] = `Student Number is Required in row ${i + 2}`;
      }

      if (data[i].size === '') {
        errors[i] = `Size is Required in row ${i + 2}`;
      }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
