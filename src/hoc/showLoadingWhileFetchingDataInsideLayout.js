import {branch, renderComponent} from 'recompose';
import LoadingSpinnerInsideLayout from 'components/LoadingSpinnerInsideLayout/LoadingSpinnerInsideLayout';

const showLoadingWhileFetchingDataInsideLayout = (isLoading) => {
  return branch(
    isLoading,
    renderComponent(LoadingSpinnerInsideLayout)
  );
};

export default showLoadingWhileFetchingDataInsideLayout;
