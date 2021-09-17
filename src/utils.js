
const FIXED_DEFAULT_VALUE = 2;

/**
 * Конвертация валюты
 * @param {*} value - валюта, которая конвертируется
 * @param {*} baseValue - валюта, в которую конвертируется
 * @param {*} fixed - количетсво символов после запятой в сконвертированном значении
 * @returns 
 */
export const convertCurrency = (value, baseValue, fixed = FIXED_DEFAULT_VALUE) => {
    if (typeof value === 'number') {
        const computedValue = value / baseValue;
        return computedValue.toFixed(fixed);
    }

    return null;
}