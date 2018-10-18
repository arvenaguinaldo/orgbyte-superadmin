import {lifecycle} from 'recompose';

const fetchInitialData = (fn) => {
  return lifecycle({
    componentDidMount() {
      fn(this.props);
    }
  });
};

export default fetchInitialData;
