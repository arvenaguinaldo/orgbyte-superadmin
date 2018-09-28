import {branch, renderComponent} from 'recompose';
import LoadingLinear from 'components/LoadingLinear/LoadingLinear';

const showLoadingWhileSubmitting = (isLoading) => {
  return branch(
    isLoading,
    renderComponent(LoadingLinear)
  );
};

export default showLoadingWhileSubmitting;
