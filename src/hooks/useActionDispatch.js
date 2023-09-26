import { useDispatch } from 'react-redux';

const useActionDispatch = (action) => {
  const dispatch = useDispatch();

  const dispatchAction = (data = {}) => {
    dispatch(action(data));
  };

  return dispatchAction;
};

export default useActionDispatch;
