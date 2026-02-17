import { excuteQuery } from '../config/db.js' // Importera hjälpfunktionen för att köra SQL-frågor mot MySQL
import bcrypt from "bcrypt"; // Importera bcrypt för hashade lösenord


// Funktion som hämtar alla användare från databasen
export const getAllAdmins = async(req, reply) => {
    try {
        // Anropar excuteQuery för att skicka SQL till databasen
        // Resultatet returneras som ett Promise och hanteras med await
        let adminData = await excuteQuery("select * from admin", []);
        reply.status(200).send(adminData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som hämtar en specifik användare baserat på ID
export const getAdminById = async(req, reply) => {
    let id = req.params.id;
    try {
        let adminData = await excuteQuery("select * from admin where id=?", [id]);
        reply.status(200).send(adminData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som lägger till ny användare
export const addAdmin = async(req, reply) => {
    try {
        const { username, password } = req.body;

            // Hashat lösenord
            const hashedPassword = await bcrypt.hash(password, 10);

            // Validering: kolla att username är en icke-tom sträng
            if (!username || typeof username !== 'string' || username.trim() === '') {
                return reply.status(400).send({ error: "Användarnamn måste fyllas i korrekt." });
            }

            // Validering: kolla att password är en icke-tom sträng
            if (!password || typeof password !== 'string' || password.trim() === '') {
                return reply.status(400).send({ error: "Password måste fyllas i korrekt." });
            }    
                  

        // SQL-fråga för att lägga till användare
        let adminData = await excuteQuery("insert into admin(username, password) values(?, ?)",
            [
                username,
                hashedPassword
            ]
        );
        reply.status(201).send({ message: "Användare skapad!", adminData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som uppdaterar en specifik användare baserad på ID
export const updateAdmin = async(req, reply) => {
    let id = req.params.id;
    try {
        const { username, password } = req.body;

            // Hasha nytt lösenord
            const hashedPassword = await bcrypt.hash(password, 10);

            // Validering: kolla att username är en icke-tom sträng
            if (!username || typeof username !== 'string' || username.trim() === '') {
                return reply.status(400).send({ error: "Användarnamn måste fyllas i korrekt." });
            }

            // Validering: kolla att password är en icke-tom sträng
            if (!password || typeof password !== 'string' || password.trim() === '') {
                return reply.status(400).send({ error: "Password måste fyllas i korrekt." });
            }   

        // SQL-fråga för att uppdatera todo
        let adminData = await excuteQuery(`update admin set username=?, password=? where id=${id}`,
            [ 
                username,
                hashedPassword
            ]
        );
        reply.status(201).send({ message: "Användare uppdaterad!", adminData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som raderar en specifik användare baserat på ID
export const deleteAdminById = async(req, reply) => {
    let id = req.params.id;
    try {
        let adminData = await excuteQuery("delete from admin where id=?", [id]);
        reply.status(200).send({ message: "Användare raderad!", adminData});
    } catch (err) {
        reply.status(500).send(err);
    }
};