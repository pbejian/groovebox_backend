import xss from "xss";

export default class UserValidator {
  createUserValidator(data) {
    for (const item in data) {
      const value = item.value;

      // gère absolument toutes les restrictions de minLength
      if (!isNaN(item.validators.minLength)) {
        const restriction = item.validators.minLength.value;
        if (value.length < restriction) {
          return item.validators.minLength.errorMessage(restriction);
        }
      }

      // gère absolument toutes les restrictions de maxLength
      if (!isNaN(item.validators.maxLength)) {
        const restriction = item.validators.maxLength.value;
        if (value.length > restriction) {
          return item.validators.maxLength.errorMessage(restriction);
        }
      }

      // gère absolument toutes les restrictions de regex
      if (!isNaN(item.validators.regex)) {
        const restriction = item.validators.regex.value;
        if (!restriction(value)) {
          return item.validators.regex.errorMessage();
        }
      }

      if (!item.noXSS) {
        item.value = xss(item.value);
      }
    }

    return null;
  }
}