import User from "../models/users.js";
import UserModel from "../models/users.js";
import argon from "argon2";

export default class UserService {
  async createUser(data) {
    // 1. récuperer chaque donnée dans variable
    const userName = data.userName.value;
    const email = data.email.value;
    const password = data.password.value;

    // 2. vérifier si le userName ou email existe déjà en db
    const existingUser = await UserModel.findOne({
      $or: [
        { email },
        { userName }
      ]
    });
    if (existingUser) {
      throw new Error("L'email ou le nom d'utilisateur existe déjà.");
    }

    // 3. hasher le mot de passe
    const hashedPassword = await argon.hash(password);

    try {
      // 4. stocker le user en db
      const newUser = new UserModel({
        userName,
        email,
        password: hashedPassword
      });
      newUser.save();
    } catch (err) {
      throw new Error("La création de l'utilisateur a raté car la base de donnée est inaccessible.")
    }


    // 5. on sort du service, et le controlleur va retourner une 200 avec un cookie pour rester authentifié
    return;
  }
}