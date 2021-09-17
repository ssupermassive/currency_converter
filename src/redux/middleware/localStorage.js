import {LS_ITEM_TOKEN} from '../constants';

export default ({ getState }) =>
  (next) =>
  async (action) => {
    const { storageToken, storageField } = action;

    if (storageToken) {
      const actionResult = next(action);
      localStorage.setItem(
        `${LS_ITEM_TOKEN}${storageToken}`,
        JSON.stringify(getState()[storageToken])
      );
      return actionResult;
    }

    return next(action);
  };
