import express from "express";
const router = express.Router();

// API REST
router.post("/user", (req, res) => {
  // que des middlewares et controlleurs dans la route
  // ex: AuthMiddleware.user(); (0 ou plusieurs)
  // ex: Controller(); (1 seul suffit)
});

export default router;

// cours 1 :
// 1. créer la route /user et ne mettre dedans que le controller pour gérer la création de l'utilisateur
// 2. créer un controller dans controllers/users.js pour gérer la validation et l'appel en base de donnée
// 3. créer un service dans services/users.js pour faire l'appel de la base de donnée
// 4. si tout se passe bien, retourner une 201, sinon une 4XX car erreur de validation.