import React from 'react';

// Textfield
import TextField from '@material-ui/core/TextField';

// Select
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';


// Date picker
import {DatePicker} from 'material-ui-pickers';

import Button from '@material-ui/core/Button';

import {CirclePicker} from 'react-color';

export const renderTextField = (
  {input, label, fullWidth, multiline, defaultValue, meta: {touched, error}, ...custom} // eslint-disable-line react/prop-types
) => (
  <TextField
    label={label}
    defaultValue={defaultValue}
    placeholder={label}
    error={!!touched && !!error}
    helperText={!!touched && error}
    margin="normal"
    fullWidth={fullWidth}
    multiline={multiline}
    {...input}
    {...custom}
  />
);

export const renderSelectField = (
  {input, label, fullWidth, multiple, meta: {touched, error, warning}, children, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} disabled={!!warning} fullWidth={fullWidth}>
    <InputLabel htmlFor="age-simple">{label}</InputLabel>
    <Select
      onChange={(event, index, value) => input.onChange(value)}
      {...input}
      {...custom}
    >
      {children}
    </Select>
    <FormHelperText>{(touched && error) || warning}</FormHelperText>
  </FormControl>
);


export const renderDatePicker = (
  {input, label, fullWidth, selected, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
    <DatePicker
      keyboard
      label={label}
      format="DD/MM/YYYY"
      placeholder="10/10/2018"
      value={selected}
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
      disableOpenOnEnter
      animateYearScrolling={false}
      {...input}
      {...custom}
    />
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);

export const renderInputImage = (
  {input, label, fullWidth, className, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <div>
    <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        style={{display: 'none'}}
        {...input}
        {...custom}
      />
      <label htmlFor="contained-button-file">
        <Button color="primary" variant="contained" component="span" fullWidth={fullWidth}>
          {label}
        </Button>
        <FormHelperText>{touched && error}</FormHelperText>
      </label>
    </FormControl>
  </div>
);

export const renderCircleColorPicker = (
  {input, fullWidth, colors, color, fieldName, selectedColor, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
    <CirclePicker
      width={300}
      circleSize={39}
      circleSpacing={11}
      color={selectedColor}
      value={selectedColor}
      colors={colors}
      onChange={() => { this.props.change(fieldName, color.hex); }} // eslint-disable-line react/prop-types
      {...input}
      {...custom}
    />
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);
