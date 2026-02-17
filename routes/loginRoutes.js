// Importerar inloggningsfunktionen från auth-controller
import { login } from "./login.js";

// Registrerar routes för autentisering
export async function loginRoutes(fastify) {
  // POST /login används för att logga in användare
  fastify.post("/login", login);
}