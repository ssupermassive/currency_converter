import cn from 'classnames';
import styles from './currency-input.module.css';
import MoneyInput from '../money-input';
import CurrencySelector from '../currency-selector';

const CurrencyInput = ({
  className,
  value,
  changeValue,
  currency,
  changeCurrency,
  caption
}) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.caption}>{caption}</div>
      <div className={styles.inputs}>
        <MoneyInput
          value={value}
          className={styles.field}
          onChangeCallback={changeValue}
        />
        <CurrencySelector
          className={styles.select}
          value={currency}
          onChangeHandler={changeCurrency}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
