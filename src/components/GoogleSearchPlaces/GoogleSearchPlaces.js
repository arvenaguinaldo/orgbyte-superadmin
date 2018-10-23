import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import googleImageSrc from './powered_by_google_default.png';
import './GoogleSearchPlaces.scss';

class GoogleSearchPlaces extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      loading: false,
      reset: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.setState({
        address: ''
      });
    }
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        this.props.onSearchAddress({lat, lng});
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({
          loading: false
        });
      });
  }

  handleChange(address) {
    this.setState({
      address
    });
  }

  render() {
    const Footer = () => (
      <div className="searchFooter">
        <div>
          <img alt="Google" src={googleImageSrc} className="image" />
        </div>
      </div>
    );

    const AutocompleteItem = ({formattedSuggestion}) => (
      <div>
        <LocationOn className="marker" />&nbsp;
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">
          {formattedSuggestion.secondaryText}
        </small>
      </div>
    );

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: false,
      placeholder: 'Hyde Park, Sydney, New South Wales, Australia'
    };

    const cssClasses = {
      root: 'root',
      input: 'input',
      autocompleteItem: 'autocompleteItem',
      autocompleteContainer: 'autocompleteContainer',
      autocompleteItemActive: 'autocompleteItemActive'
    };

    const shouldFetchSuggestions = ({value}) => value.length >= 1;

    const onError = (status, clearSuggestions) => {
      console.log(
        'Error happened while fetching suggestions from Google Maps API',
        status
      );
      clearSuggestions();
    };

    const options = {
      componentRestrictions: {country: 'ph'}
    };

    return (
      <div className="searchAddress">
        {this.props.isScriptLoaded &&
          this.props.isScriptLoadSucceed && (
          <div>
            <PlacesAutocomplete
              onSelect={this.handleSelect}
              onError={onError}
              renderSuggestion={AutocompleteItem}
              onEnterKeyDown={this.handleSelect}
              inputProps={inputProps}
              classNames={cssClasses}
              shouldFetchSuggestions={shouldFetchSuggestions}
              renderFooter={Footer}
              options={options}
              hasCustomInput
            >
              <TextField
                label="Search Address"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
                autoComplete="off"
                {...inputProps}
              />
            </PlacesAutocomplete>
          </div>
        )}
        {this.state.loading ? (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        ) : null}
      </div>
    );
  }
}

GoogleSearchPlaces.propTypes = {
  onSearchAddress: PropTypes.func,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  reset: PropTypes.bool
};

export default GoogleSearchPlaces;


// import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from 'react-places-autocomplete';

// class GoogleSearchPlaces extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {address: ''};
//   }

//   handleChange = (address) => {
//     this.setState({address});
//   };

//   handleSelect = (address) => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };

//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input'
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map((suggestion) => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? {backgroundColor: '#fafafa', cursor: 'pointer'}
//                   : {backgroundColor: '#ffffff', cursor: 'pointer'};
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }
// export default GoogleSearchPlaces;
