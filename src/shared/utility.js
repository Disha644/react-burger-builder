export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const checkValidity = (value, rules) => {

    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required)
        isValid = isValid && value.trim() !== '';
    if (rules.minLen)
        isValid = isValid && value.length >= rules.minLen;
    if (rules.maxLen)
        isValid = isValid && value.length <= rules.maxLen;
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;

};