import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { excuteQuery } from "../config/db.js";

// Funktion för användarinloggning
export const login = async (req, reply) => {
  const { username, password } = req.body;

  try {
    // Hämta användaren med angivet användarnamn från databasen
    const users = await excuteQuery(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    // Om ingen användare hittas
    if (users.length === 0) {
      return reply.status(401).send({ error: "Fel användarnamn eller lösenord" });
    }

    const user = users[0];

    // Kontrollera om lösenordet stämmer med det hashade lösenordet i databasen
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return reply.status(401).send({ error: "Fel användarnamn eller lösenord" });
    }

    // Skapa JWT-token med användarens id och username
    // Tokenen är giltig i 2 timmar
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "2h" }
    );

    // Skicka tillbaka token och användarinformation till klienten
    reply.send({
      message: "Inloggning lyckades",
      token,
      user: {
        id: user.id,
        username: user.username,
      }
    });

  } catch (err) {
    // Om något går fel vid databasanrop eller token-skapande
    reply.status(500).send(err);
  }
};