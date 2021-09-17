import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect, Switch } from 'react-router-dom';

import CurrenciesPage from '../pages/currencies';
import ConverterPage from '../pages/converter';
import { Page } from '../components/page';
import Tabs from '../components/tabs';
import CurrencySelector from '../components/currency-selector';

import {
  currencyLoadingSelector,
  currencyLoadedSelector,
  currencyErrorSelector,
  currencyBaseSelector,
} from '../redux/selectors';
import { loadCurrencyList } from '../redux/actions';
import { changeBaseCurrency } from '../redux/actions';

import styles from './app.module.css';

const App = ({
  base,
  loading,
  loaded,
  error,
  loadCurrencyList,
  changeBaseCurrency,
}) => {
  useEffect(() => {
    if (!loading && !loaded && !error) {
      loadCurrencyList();
    }
  }, [loading, loaded, error, loadCurrencyList]);

  const tabs = [
    {
      id: 0,
      name: 'Курсы валют',
      route: '/currency',
    },
    {
      id: 1,
      name: 'Конвертер',
      route: '/converter',
    },
  ];

  const currencyComponent = () => (
    <CurrencySelector value={base} onChangeHandler={changeBaseCurrency} />
  );

  const header = (
    <div className={styles.header}>
      <Tabs items={tabs} keyProp='id' displayProp='name' />
      <Route path='/currency' component={currencyComponent} />
    </div>
  );

  return (
    <Page loaded={loaded} header={header}>
      <Switch>
        <Route path='/currency' component={CurrenciesPage} />
        <Route path='/converter' component={ConverterPage} />
        <Redirect from='/' to='/currency' />
      </Switch>
    </Page>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    loading: currencyLoadingSelector,
    loaded: currencyLoadedSelector,
    error: currencyErrorSelector,
    base: currencyBaseSelector,
  });

export default connect(mapStateToProps, {
  loadCurrencyList,
  changeBaseCurrency,
})(App);
