import { REQUEST, SUCCESS, FAILURE } from '../constants';

export default (store) => (next) => async (action) => {
    const {type, apiUrl, privateKey, ...rest} = action;

    if (!apiUrl) {
        return next(action);
    }

    next({type: `${type}${REQUEST}`, ...rest});

    try {
        const loadedData = await fetch(apiUrl).then((res) => res.json());
        next({type: `${type}${SUCCESS}`, loadedData, ...rest});
    } catch (error) {
        next({type: `${type}${FAILURE}`, error, ...rest});
    }
}