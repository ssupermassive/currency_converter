import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './converter.module.css';
import { ReactComponent as RevertIcon } from '../../assets/sync.svg';
import { currencyItemsSelector } from '../../redux/selectors';
import { createStructuredSelector } from 'reselect';
import { addConvertResult } from '../../redux/actions';
import { convertCurrency } from '../../utils';
import CurrencyInput from '../../components/currency-input';

/**
 * Возвращает обработчик события ввода в текстовое поле
 * @param {*} param0
 * @returns
 */
const getInputHandler = ({
  setFromValue,
  setToValue,
  fromCurrency,
  toCurrency,
  convert,
}) => {
  return (value) => {
    setFromValue(value);
    setToValue(
      convert({
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        inputValue: value,
      })
    );
  };
};

/**
 * Возвращает обработчик события смены валюты
 * @param {*} param0
 * @returns
 */
const getCurrencyInputHandler =
  ({ setCurrency, setValue, toCurrency, value, convert }) =>
  (currency) => {
    setCurrency(currency);

    if (currency === toCurrency) {
      setValue(value);
      return;
    }

    setValue(
      convert({
        fromCurrency: currency,
        toCurrency: toCurrency,
        inputValue: value,
      })
    );
  };

/**
 * Страница с конвертером
 * @param {*} param0
 * @returns
 */
const ConverterPage = ({ currencyItems }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('RUB');

  const convert = ({ fromCurrency, toCurrency, inputValue }) => {
    const from = currencyItems[fromCurrency].Value;
    const to = currencyItems[toCurrency].Value;
    const value = Number(inputValue) * from;
    return convertCurrency(value, to);
  };

  const fromInputHandler = getInputHandler({
    setFromValue,
    setToValue,
    fromCurrency,
    toCurrency,
    convert
  });

  const toInputHandler = getInputHandler({
    setFromValue: setToValue,
    setToValue: setFromValue,
    fromCurrency: toCurrency,
    toCurrency: fromCurrency,
    convert
  });

  const revertCurrency = () => {
    const lastToValue = toValue;
    const lastFromValue = fromValue;
    const lastFromCurrency = fromCurrency;
    const lastToCurrency = toCurrency;

    setFromCurrency(lastToCurrency);
    setToCurrency(lastFromCurrency);
    setFromValue(lastToValue);
    setToValue(lastFromValue);
  };

  const setToCurrencyHandler = getCurrencyInputHandler({
    setCurrency: setToCurrency,
    setValue: setFromValue,
    toCurrency: fromCurrency,
    value: toValue,
    convert: convert
  });

  const setFromCurrencyHandler = getCurrencyInputHandler({
    setCurrency: setFromCurrency,
    setValue: setToValue,
    toCurrency: toCurrency,
    value: fromValue,
    convert: convert
  });

  return (
    <div className={styles.fields}>
      <CurrencyInput
        caption='У меня есть:'
        value={toValue}
        changeValue={toInputHandler}
        currency={toCurrency}
        changeCurrency={setToCurrencyHandler}
      />
      <RevertIcon onClick={revertCurrency} className={styles.revert} />
      <CurrencyInput
        caption='Хочу приобрести:'
        value={fromValue}
        changeValue={fromInputHandler}
        currency={fromCurrency}
        changeCurrency={setFromCurrencyHandler}
      />
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    currencyItems: currencyItemsSelector,
  });

export default connect(mapStateToProps, { addConvertResult })(ConverterPage);
