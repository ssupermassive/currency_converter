import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../../history';

import {default as currency} from './currency';
import {default as converted} from './converted';

export default combineReducers({
    router: connectRouter(history),
    currency,
    converted
});

