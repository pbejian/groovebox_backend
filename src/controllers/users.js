import UserValidatorClass from "../validators/users.js";
import RegexClass from "../utils/regex.js";
import UserServiceClass from "../services/users.js";

const UserValidator = new UserValidatorClass();
const Regex = new RegexClass();
const UserService = new UserServiceClass();

export default class UserController {
  async createUser(req, res) {
    try {
      // Dans chaque controlleur, il y aura:
      // 1. la récupération des données dans l'url en GET/DELETE ou dans le body en POST/PUT/PATCH
      // 2. il faut valider chaque donnée récupéré
      // 3. si une donnée est validé côté serveur, il faut se protéger de l'injection XSS (ex: userName = xss(userName))
      // 4. maintenant, si tout est ok, il faut appeler le service User car on est dans User (car on va traiter la DB)
      // 4.bis (on est dans le service)
      // 5. si tout est ok une fois la fonction service fini, on renvoie une 200 ou 201 ici car on crée un ressource.

      // 1.
      //let avatar = req.body.avatar;
      const data = {
        userName: {
          value: req.body?.userName,
          validators: {
            minLength: {
              value: 3,
              errorMessage: (value) => `Le nom d'utilisateur doit avoir au moins ${value} caractère${value > 1 ? "s" : ""}.`
            },
            maxLength: {
              value: 30,
              errorMessage: (value) => `Le nom d'utilisateur doit avoir moins de ${value} caractère${value > 1 ? "s" : ""}.`
            }
          }
        },
        email: {
          value: req.body?.email,
          validators: {
            minLength: {
              value: 3,
              errorMessage: (value) => `L'email doit avoir au moins ${value} caractère${value > 1 ? "s" : ""}.`
            },
            maxLength: {
              value: 100,
              errorMessage: (value) => `L'email doit avoir moins de ${value} caractère${value > 1 ? "s" : ""}.`
            },
            regex: {
              value: Regex.emailRegex,
              errorMessage: () => `L'email n'est pas conforme.`
            },
          }
        },
        password: {
          value: req.body?.password,
          validators: {
            minLength: {
              value: 8,
              errorMessage: (value) => `Le mot de passe doit avoir au moins ${value} caractère${value > 1 ? "s" : ""}.`
            },
            maxLength: {
              value: 100,
              errorMessage: (value) => `Le mot de passe doit avoir plus de ${value} caractère${value > 1 ? "s" : ""}.`
            },
            regex: {
              value: Regex.passwordRegex,
              errorMessage: () => `Le mot de passe n'est pas conforme.`
            }
          },
          // on ajoute ce paramètre car il ne faut pas gérer la XSS sur le mot de passe.
          // Pourquoi ? Sinon on va modifier sa valeur si il contient des < ou > et si tu oublies de mettre le même traitement
          // sur la connexion, xss(password) != password en DB ( < -> &lsaquo;)
          noXSS: true
        }
      }

      // mot de passe: <script>
      // xss(<script>) = &lsaquo;script&lsaquo;
      // <script> ne sera jamais égal à &lsaquo;script&lsaquo;

      // 2. && 3.
      // Si on doit mettre que de la validation en client ou serveur, il faut forcément la mettre sur le serveur, JAMAIS QUE CÔTÉ CLIENT
      // Pourquoi ? Car on peut facilement bypass la validation côté client, on ne peut pas bypass la validation côté serveur.
      // Comment ? Renvoyer la requête XHR sur Firefox en modifiant le request.body par exemple

      // cet appel va valider les données de data et gérer la XSS en même temps
      const errorMessage = UserValidator.createUserValidator(data);
      if (errorMessage) {
        return res.status(400).json({ message: errorMessage });
      }
      // vérifier que la confirmation du mot de passe est bien correspondante
      if (!req.body?.confirmPassword || data.password.value !== req.body?.confirmPassword) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
      }
      // ici, les données sont validées et chaque données est géré par la XSS (sauf mot de passe)

      // 4.
      await UserService.createUser(data);

      // 5.
      // TODO: il manque la création de cookie httpOnly + jwt
      return res.status(201).json({
        userName: data.userName.value,
        email: data.email.value
      });
    } catch (err) {
      let error_stack = "";
      if (err instanceof Error) {
        error_stack = err.stack ?? "";
      } else if (typeof err === "object") {
        try {
          error_stack = JSON.stringify(err);
        } catch {
          error_stack = String(err);
        }
      } else {
        error_stack = String(err);
      }
      // pour débugger seulement
      // console.log(error_stack);

      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({ message: error_stack })
    }
  }
}
