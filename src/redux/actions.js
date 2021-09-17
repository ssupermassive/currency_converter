import { LOAD_CURRENCY, CHANGE_BASE_CURRENCY, ADD_CONVERT_RESULT } from './constants';

export const loadCurrencyList = () => ({
  type: LOAD_CURRENCY,
  apiUrl: `https://www.cbr-xml-daily.ru/daily_json.js`,
});

export const changeBaseCurrency = (base) => ({
  type: CHANGE_BASE_CURRENCY,
  base
});

export const addConvertResult = (data) => ({
  type: ADD_CONVERT_RESULT,
  data,
  storageToken: 'converted'
})
