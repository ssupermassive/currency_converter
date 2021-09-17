import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import {default as reducer} from './reducers';
import {default as api} from './middleware/api';
import {default as localStorageMiddleware} from './middleware/localStorage';
import {LS_ITEM_TOKEN} from './constants';

const enhancer = applyMiddleware(api, localStorageMiddleware);

const rehidrateLocalStorageState = () => {
    const state = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key.includes(LS_ITEM_TOKEN)) {
            const clearedKey = key.replace(LS_ITEM_TOKEN, '');
            state[clearedKey] = JSON.parse(localStorage.getItem(key));
        }
    }
    return state;
}

export default createStore(reducer, rehidrateLocalStorageState(), composeWithDevTools(enhancer));