import produce from 'immer';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_CURRENCY,
  CHANGE_BASE_CURRENCY,
} from '../constants';

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  error: null,
  base: 'RUB',
  items: {},
};

const RUB_VALUE = 1;

export default produce((draft = INITIAL_STATE, action) => {
  const { type, loadedData, base } = action;
  switch (type) {
    case LOAD_CURRENCY + REQUEST:
      draft.loading = true;
      draft.loaded = false;
      return draft;
    case LOAD_CURRENCY + SUCCESS:
      draft.loading = false;
      draft.loaded = true;

      draft.items = loadedData.Valute;

      // Т.к. АПИ возвращает данные относительно рубля,его небудет в наборе. Добавляем
      draft.items.RUB = {
        CharCode: 'RUB',
        Name: 'Российский рубль',
        Value: RUB_VALUE,
      };

      return draft;
    case LOAD_CURRENCY + FAILURE:
      draft.loading = false;
      draft.loaded = false;
      draft.error = action.error;
      return draft;
    case CHANGE_BASE_CURRENCY:
      draft.base = base;

      // АПИ всегда возвращает данные относительно рубля.
      // Т.к. рубль относится сам к себе как 1/1, при переключении базовой валюты
      // нужно поменять значение рубля на Value новой базовой валюты умноженную на саму себя
      // что бы конвертер правильно вычислил соотношение.
      draft.items.RUB.Value =
        base === 'RUB' ? RUB_VALUE : draft.items[base].Value * draft.items[base].Value;

      return draft;
    default:
      return draft;
  }
});
