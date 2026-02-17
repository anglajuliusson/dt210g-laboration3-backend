import { addAdmin, deleteAdminById, getAllAdmins, getAdminById, updateAdmin } from './admin.js'; // Importerar controller-funktionerna från admin.js

export async function routes(fastify) {
    // Registrerar GET-route och kopplar till controller-funktionen
    fastify.get('/admin', getAllAdmins); // Route för att hämta alla användare
    fastify.get('/admin/:id', getAdminById); // Route för att hämta en användare med specifikt id
    fastify.post('/admin', addAdmin); // Route för att lägga till ny användare
    fastify.put('/admin/:id', updateAdmin); // Route för att uppdatera en användare med specifikt id
    fastify.delete('/admin/:id', deleteAdminById); // Route för att radera en användare med specifikt id
};