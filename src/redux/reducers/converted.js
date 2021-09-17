import produce from 'immer';
import {
  ADD_CONVERT_RESULT
} from '../constants';

const INITIAL_STATE = {
  items: {},
};

export default produce((draft = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
    case ADD_CONVERT_RESULT:
        draft.items[data.key] = data;
        return draft;
    default:
      return draft;
  }
});
