import jwt from "jsonwebtoken";

// Middleware som verifierar JWT-token för skyddade endpoints
export const verifyToken = async (req, reply) => {
  try {
    // Hämtar Authorization-headern från inkommande request
    const loginHeader = req.headers.authorization;

    // Om ingen Authorization-header finns, nekas åtkomst
    if (!loginHeader) {
      return reply.status(401).send({ error: "Ingen token skickad" });
    }

    // Extraherar token från formatet "Bearer <token>"
    const token = loginHeader.split(" ")[1];

    // Verifierar token med hemlig nyckel
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret"
    );

    // Sparar den avkodade användarinformationen i request-objektet
    req.user = decoded;

  } catch {
    // Om token är ogiltig eller har gått ut returneras 401
    return reply.status(401).send({ error: "Ogiltig token" });
  }
};