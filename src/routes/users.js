import express from "express";
import UserControllerClass from "../controllers/users.js";

const UserController = new UserControllerClass();
const router = express.Router();

// API REST
router.post("/user", async (req, res) => {
  // que des middlewares et controlleurs dans la route
  // ex: AuthMiddleware.user(); (0 ou plusieurs)
  // ex: Controller(); (1 seul suffit)
  await UserController.createUser(req, res);
});

export default router;

// cours 1 :
// 1. créer la route /user et ne mettre dedans que le controller pour gérer la création de l'utilisateur
// 2. créer un controller dans controllers/users.js pour gérer la validation et l'appel en base de donnée
// 3. créer un service dans services/users.js pour faire l'appel de la base de donnée
// 4. si tout se passe bien, retourner une 201, sinon une 4XX car erreur de validation.

// règles sur les routers, controllers, validateurs, services, models.
// - les routers sont appelé que dans app.js pour que la route soit accessible sur localhost:8000/...
// - les controllers sont appelé que dans les router.
// - les validateurs sont utilisé que dans les controllers pour valider et traiter la XSS.
// - les services sont appelé que dans les controllers pour gérer la base de donnée une fois que les données sont 100% validées et safe (pas XSS)
// - les models sont utilisés pour appeler la base de donnée elle-même et chaque collection.