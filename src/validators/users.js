import xss from "xss";

export default class UserValidator {
  createUserValidator(data) {
    for (const key in data) {
      const item = data[key];
      const value = item.value;

      // gère le cas où la valeur n'est pas définie
      if (value === undefined) {
        const restriction = item.validators.minLength.value;
        return item.validators.minLength.errorMessage(restriction);
      }

      // gère absolument toutes les restrictions de minLength
      if (item.validators?.minLength && typeof item.validators.minLength.value === "number") {
        const restriction = item.validators.minLength.value;
        if (value.length < restriction) {
          return item.validators.minLength.errorMessage(restriction);
        }
      }

      // gère absolument toutes les restrictions de maxLength
      if (item.validators?.maxLength && typeof item.validators.maxLength.value === "number") {
        const restriction = item.validators.maxLength.value;
        if (value.length > restriction) {
          return item.validators.maxLength.errorMessage(restriction);
        }
      }

      // gère absolument toutes les restrictions de regex
      if (item.validators?.regex && item.validators.regex.value) {
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