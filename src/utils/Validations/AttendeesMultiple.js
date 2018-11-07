import isEmpty from 'lodash/isEmpty';

export default function validateInput(data, event) {
  const errors = {};

  const csvKeys = Object.keys(data[0]);

  if (!csvKeys.includes('student_number') || !csvKeys.includes('last_name') || !csvKeys.includes('first_name')
  || !csvKeys.includes('middle_name') || !csvKeys.includes('section') || !csvKeys.includes('group')
  || !csvKeys.includes('year_level') || !csvKeys.includes('email') || !csvKeys.includes('contact_number')
  || !csvKeys.includes('attendee_type') || !csvKeys.includes('course_name')) {
    errors[0] = 'Invalid CSV format';
  } else {

    for (let i = 0; i < data.length; i += 1) {
      if (!/^20[0-9][0-9]{7}$/g.test(data[i].student_number) && data[i].student_number) {
        errors[i] = `Invalid Student Number, must be 10 digits or starts with 20 in row ${i + 2}`;
        console.log(errors[i]);
      }

      if (!/^[A-Z]{1}$/gm.test(data[i].section) && data[i].section) {
        errors[i] = `Invalid Section, must be a Character or Uppercase in row ${i + 2}`;
      }

      if (!/^[1-2]{1}$/i.test(data[i].group) && data[i].group) {
        errors[i] = `Invalid Group Level, must be a number or 1 digit only in row ${i + 2}`;
      }

      if (!/^[1-5]{1}$/i.test(data[i].year_level) && data[i].year_level) {
        errors[i] = `Invalid Year Level, must be a number or 1 digit only in row ${i + 2}`;
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data[i].email) && data[i].email) {
        errors[i] = `Enter a valid email in row ${i + 2}`;
      }

      if (!/^(0|[1-9][0-9]{9})$/i.test(data[i].contact_number) && data[i].contact_number) {
        errors[i] = `Invalid Contact number, must be 10 digits or not starting with 0 in row ${i + 2}`;
      }

      if (!/^[A-Z]*$/gm.test(data[i].course_name) && data[i].course_name) {
        errors[i] = `Invalid Course Name, must be a Character or Uppercase in row ${i + 2}`;
      }

      if (!/^[A-Z-]*$/gm.test(data[i].attendee_type) && data[i].attendee_type) {
        errors[i] = `Invalid Attendee Type, must be a Character or Uppercase in row ${i + 2}`;
      }

      if ((data[i].attendee_type !== 'MEMBER' && data[i].attendee_type !== 'BULSUAN' && data[i].attendee_type !== 'NON-BULSUAN')) {
        errors[i] = `Invalid Attendee Type, type doesn't exist in row ${i + 2}`;
      }

      if (event.members === false && data[i].attendee_type === 'MEMBER') {
        errors[i] = `MEMBERS are not allowed to attend to this Event in row ${i + 2}`;
      }

      if (event.bulsuans === false && data[i].attendee_type === 'BULSUAN') {
        errors[i] = `BULSUANS are not allowed to attend to this Event in row ${i + 2}`;
      }

      if (event.non_bulsuans === false && data[i].attendee_type === 'NON-BULSUAN') {
        errors[i] = `NON - BULSUANS are not allowed to attend to this Event in row ${i + 2}`;
      }


      if (data[i].student_number === '' && data[i].attendee_type !== 'NON-BULSUAN') {
        errors[i] = `Student Number is Required in row ${i + 2}`;
      }

      if (data[i].last_name === '') {
        errors[i] = `Last Name is Required in row ${i + 2}`;
      }

      if (data[i].first_name === '') {
        errors[i] = `First Name is Required in row ${i + 2}`;
      }

      if (data[i].email === '') {
        errors[i] = `Email is Required in row ${i + 2}`;
      }

      if (data[i].contact_number === '') {
        errors[i] = `Contact Number is Required in row ${i + 2}`;
      }

      if (data[i].section === '' && data[i].attendee_type !== 'NON-BULSUAN') {
        errors[i] = `Section is Required in row ${i + 2}`;
        console.log(errors[i]);
      }

      if (data[i].group === '' && data[i].attendee_type !== 'NON-BULSUAN') {
        errors[i] = `Group is Required in row ${i + 2}`;
      }

      if (data[i].year_level === '' && data[i].attendee_type !== 'NON-BULSUAN') {
        errors[i] = `Year Level is Required in row ${i + 2}`;
      }

      if (data[i].course_name === '' && data[i].attendee_type !== 'NON-BULSUAN') {
        errors[i] = `Course Name is Required in row ${i + 2}`;
      }

      if (data[i].attendee_type === '') {
        errors[i] = `Attendee Type is Required in row ${i + 2}`;
      }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
