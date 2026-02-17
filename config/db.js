import mysql from "mysql2"; // Importera mysql2 för att kunna ansluta till MySQL
import { createRequire } from "module"; // Skapar require-funktion för att kunna använda CommonJS-moduler i ES-modul

const require = createRequire(import.meta.url);
const config = require("./constant.json"); // Läser in databasinställningar från extern konfigurationsfil

// Anslutningspool mot databasen
const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: config.DB_PORT,
    database: config.DB_DATABASE
});

// Anslut till databas
pool.getConnection((err) => {
    if (err) {
        console.log("Fel vid anslutning till databas: " + err);
        process.exit(1); // Stoppar koden om anslutningen misslyckas
    }
    console.log("Ansluten till databas!");
});

// Funktion för att köra SQL-frågor mot databasen
export function excuteQuery (query, arrayParams = []) {
    // Returnerar ett Promise som antingen lyckas (resolve) eller misslyckas (reject)
    return new Promise((resolve, reject) => {
        try {
            // Skickar SQL-frågan till databasen via connection poolen
            // query = SQL-strängen (t.ex. "SELECT * FROM concerts WHERE id = ?")
            // arrayParams = värden som ersätter ? i SQL-frågan
            pool.query(query, arrayParams, (err, data) => {
                // Om databasen returnerar ett fel
                if (err) {
                    console.log("Fel vid körning av frågan: " + err);
                    reject(err); // Avbryter promise och skickar vidare felet
                }
                resolve(data); // Returnerar resultatet från databasen
            })
        // Fångar oväntade JavaScript-fel
        }catch (err) {
            reject(err);
        }
    });
}