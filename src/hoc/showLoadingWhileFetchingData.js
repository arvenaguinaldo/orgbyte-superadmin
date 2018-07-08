import {branch, renderComponent} from 'recompose';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const showLoadingWhileFetchingData = (isLoading) => {
  return branch(
    isLoading,
    renderComponent(LoadingSpinner)
  );
};

export default showLoadingWhileFetchingData;
