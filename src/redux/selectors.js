import {createSelector} from 'reselect';

export const currencyLoadingSelector = (state) => state.currency.loading;
export const currencyLoadedSelector = (state) => state.currency.loaded;
export const currencyErrorSelector = (state) => state.currency.error;
export const currencyItemsSelector = (state) => state.currency.items;
export const currencyBaseSelector = (state) => state.currency.base;

export const baseValueSelector = (state) => state.currency.items[state.currency.base].Value

export const currencyItemsArraySelector = createSelector(
    currencyItemsSelector,
    currencyBaseSelector,
    (items, base) => Object.values(items).filter((item) => item.CharCode !== base)
)

export const convertedItemsSelector = (state) => state.converted.items;
export const convertedItemsArraySelector = (state) => Object.values(state.converted.items);

