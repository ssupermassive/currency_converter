import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import List from '../../components/list';
import MoneyConverter from '../../components/money-converter';

import { currencyItemsArraySelector } from '../../redux/selectors';

import styles from './currencies.module.css';

const itemTemplate = ({ data }) => (
  <div className={styles.itemItemplate}>
    <div className={styles.code_column}>{data.CharCode}</div>
    <div className={styles.name_column} title={data.Name}>
      {data.Name}
    </div>
    <div className={styles.value_column}>
      <MoneyConverter value={data.Value} />
    </div>
  </div>
);
const headerContent = () => (
  <div className={styles.headerTemplate}>
    <div className={styles.code_column}>Код</div>
    <div className={styles.name_column}>Наименование</div>
    <div className={styles.value_column}>Курс</div>
  </div>
);

const Currencies = ({ items }) => {
  return (
    <div className={styles.container}>
      <List
        items={items}
        itemTemplate={itemTemplate}
        headerContent={headerContent}
        keyProp='CharCode'
      />
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    items: currencyItemsArraySelector,
  });

export default connect(mapStateToProps)(Currencies);
