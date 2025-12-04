export default class Regex {
  emailRegex(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
  }

  passwordRegex(value) {
    // contient au moins :
    // - une majuscule
    // - une minuscule
    // - un chiffre
    // - un caractère spéciale dont: #?!@$%^&*-
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
  }

  phoneRegex(value) {
    // exemple de téléphone valide :
    // +33 6 49 49 51 37
    // 06 49 49 51 37
    // 6 49 49 51 37
    // 649 4951 37
    return /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(value);
  }
}