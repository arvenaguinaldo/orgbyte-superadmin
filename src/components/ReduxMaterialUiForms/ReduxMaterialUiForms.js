import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Input from '@material-ui/core/Input';
import ChipInput from 'material-ui-chip-input';

// import MenuItem from '@material-ui/core/MenuItem';

// import PlacesAutocomplete from 'react-places-autocomplete';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';


// Date picker
import {DatePicker} from 'material-ui-pickers';
import {DateTimePicker} from 'material-ui-pickers';

import {CirclePicker} from 'react-color';

export const renderTextField = (
  {input, type, label, handler, showPassword, fullWidth, multiline, defaultValue, readOnly, meta: {touched, error, warning}, ...custom} // eslint-disable-line react/prop-types
) => (
  <TextField
    label={label}
    defaultValue={defaultValue}
    placeholder={label}
    error={!!touched && !!error}
    helperText={(touched && error) || warning}
    margin="normal"
    fullWidth={fullWidth}
    multiline={multiline}
    InputProps={{
      readOnly
    }}
    {...input}
    {...custom}
  />
);

export const renderPasswordField = (
  {input, type, label, handler, showPassword, fullWidth, multiline, defaultValue, meta: {touched, error, warning}, ...custom} // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
    <Input
      label={label}
      defaultValue={defaultValue}
      placeholder={label}
      error={!!touched && !!error}
      margin="none"
      fullWidth={fullWidth}
      multiline={multiline}
      type={type}
      {...input}
      {...custom}
    />
    <FormHelperText>{(touched && error) || warning}</FormHelperText>
  </FormControl>
);

export const renderSelectField = (
  {input, label, fullWidth, multiple, readOnly, meta: {touched, error, warning}, children, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} disabled={!!warning} fullWidth={fullWidth}>
    <InputLabel htmlFor={readOnly ? 'name-readonly' : 'age-native-simple'}>{label}</InputLabel>
    {readOnly ? (
      <Select
        native
        {...input}
        onChange={(event, index, value) => input.onChange(value)} // eslint-disable-line
        input={<Input name="name" id="name-readonly" readOnly />}
        {...custom}
      >
        {children}
      </Select>
    ) : (
      <Select
        native
        onChange={(event, index, value) => input.onChange(value)} // eslint-disable-line
        {...input}
        {...custom}
      >
        {children}
      </Select>
    )}
    <FormHelperText>{(touched && error) || warning}</FormHelperText>
  </FormControl>
);


export const renderDatePicker = (
  {input, label, fullWidth, maxDate, selected, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
    <DatePicker
      keyboard
      label={label}
      format="DD/MM/YYYY"
      placeholder="10/10/2018"
      maxDate={maxDate}
      value={selected}
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
      disableOpenOnEnter
      animateYearScrolling
      {...input}
      {...custom}
    />
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);

export const renderDateTimePicker = (
  {input, label, fullWidth, selected, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
    <DateTimePicker
      keyboard
      label={label}
      value={selected}
      disableOpenOnEnter
      animateYearScrolling
      placeholder="2018/01/01 06:54 AM"
      format="DD/MM/YYYY hh:mm A"
      mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'] : [])}
      {...input}
      {...custom}
    />
    <FormHelperText>{touched && error}</FormHelperText>
  </FormControl>
);

export const renderInput = (
  {input, label, fullWidth, accept, className, meta: {touched, error}, ...custom}, // eslint-disable-line react/prop-types
) => (
  <div>
    <FormControl margin="normal" error={!!touched && !!error} fullWidth={fullWidth}>
      <input
        {...input}
        accept={accept}
        id="contained-button-file"
        type="file"
        style={{display: 'none'}}
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


export const renderRadioButton = (
  {input, label, fullWidth, meta: {touched, error, warning}, children, ...custom}, // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} disabled={!!warning} fullWidth={fullWidth}>
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup
      aria-label={label}
      onChange={(event, index, value) => input.onChange(value)} // eslint-disable-line
      style={{display: 'inline-table', padding: '0px'}}
      {...input}
      {...custom}
    >
      {children}
    </RadioGroup>
    <FormHelperText>{(touched && error) || warning}</FormHelperText>
  </FormControl>
);

export const renderCheckbox = (
  {input, label}, // eslint-disable-line react/prop-types
) => (
  <div style={{display: 'inline-table', padding: '0px'}}>
    <FormControlLabel
      control={
        <Checkbox
          {...input}
          defaultChecked={input.value} // eslint-disable-line
          checked={input.checked} // eslint-disable-line
          onChange={input.onChange} // eslint-disable-line
        />
      }
      label={label}
    />
  </div>
);

export const renderMUIPlacesAutocomplete = ({onSuggestionSelected, ...other}) => (
  <MUIPlacesAutocomplete
    onSuggestionSelected={onSuggestionSelected}
    suggestionsContainerProps={{style: {width: '0px'}}}
    renderTarget={() => (
      <div />
    )}
    textFieldProps={{...other}}
  />
);

export const renderChipEmail = (
  {input, label, fullWidth, floatingLabelText, helper, meta: {touched, error, warning}, ...custom} // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} disabled={!!warning} fullWidth={fullWidth}>
    <ChipInput
      {...input}
      {...custom}
      value={input.value || []} // eslint-disable-line
      onBeforeAdd={(toAddChip) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(toAddChip)) {
          return false;
        } return true;
      }}
      onAdd={(addedChip) => {
        let values = input.value || []; // eslint-disable-line
        values = values.slice();
        values.push(addedChip);
        input.onChange(values); // eslint-disable-line
      }}
      onDelete={(deletedChip) => {
        let values = input.value || []; // eslint-disable-line
        values = values.filter(v => v !== deletedChip);
        input.onChange(values); // eslint-disable-line
      }}
      onBlur={() => input.onBlur()} // eslint-disable-line
      label={label}
      fullWidth={fullWidth}
    />
    <FormHelperText>{(touched && error) || warning || helper}</FormHelperText>
  </FormControl>
);

export const renderChipPhoneNumber = (
  {input, label, fullWidth, floatingLabelText, helper, meta: {touched, error, warning}, ...custom} // eslint-disable-line react/prop-types
) => (
  <FormControl margin="normal" error={!!touched && !!error} disabled={!!warning} fullWidth={fullWidth}>
    <ChipInput
      {...input}
      {...custom}
      value={input.value || []} // eslint-disable-line
      onBeforeAdd={(toAddChip) => {
        if (!/^(0|[1-9][0-9]{9})$/i.test(toAddChip)) {
          return false;
        } return true;
      }}
      onAdd={(addedChip) => {
        let values = input.value || []; // eslint-disable-line
        values = values.slice();
        values.push(addedChip);
        input.onChange(values); // eslint-disable-line
      }}
      onDelete={(deletedChip) => {
        let values = input.value || []; // eslint-disable-line
        values = values.filter(v => v !== deletedChip);
        input.onChange(values); // eslint-disable-line
      }}
      onBlur={() => input.onBlur()} // eslint-disable-line
      label={label}
      fullWidth={fullWidth}
    />
    <FormHelperText>{(touched && error) || warning || helper}</FormHelperText>
  </FormControl>
);

renderMUIPlacesAutocomplete.propTypes = {
  onSuggestionSelected: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired
};
