
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { baseValueSelector, currencyBaseSelector } from '../../redux/selectors';

import {convertCurrency} from  '../../utils'

const MoneyConverter = ({value, baseValue, fixed }) => {
    return convertCurrency(value, baseValue, fixed);
}

const mapStateToProp = () => createStructuredSelector({
    baseValue: baseValueSelector,
    base: currencyBaseSelector
})

export default connect(mapStateToProp)(MoneyConverter);