# Backend-API – Personlig blogg (CRUD + JWT)

Detta projekt är ett backend-API för en personlig blogg. API:et används av en frontend för att hämta och hantera blogginlägg. Alla besökare kan läsa inlägg, men endast en inloggad administratör kan skapa, uppdatera och ta bort inlägg.

## Funktionalitet

- CRUD för blogginlägg
  - **GET**: hämta alla inlägg / hämta ett inlägg via id
  - **POST**: skapa nytt inlägg (skyddad endpoint)
  - **PUT**: uppdatera inlägg (skyddad endpoint)
  - **DELETE**: ta bort inlägg (skyddad endpoint)
  - Autentisering med **JWT**
  - **Login-endpoint** som returnerar JWT-token
  - Validering av token för skyddade endpoints

---

## Teknikstack

- **Node.js**
- **Fastify**
- **MySQL**
- **JWT (jsonwebtoken)**
- **bcrypt** (hashning av lösenord)

---

## Installation
Installera beroenden:
```bash
npm install
```
Starta servern: 
```bash
npm run start
```

Servern körs på:
```
http://localhost:3000
```

## Databas

Skapa databas och tabell:
```sql
CREATE DATABASE IF NOT EXISTS blog;
USE blog;

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Autentisering
Logga in:

POST /login

Request body:
```json
{
  "username": "admin",
  "password": "password"
}
```

Svar:
```json
{
  "token": "JWT_TOKEN"
}
```


Token skickas sedan i skyddade anrop via header:
Authorization: Bearer <token>

## Endpoints
### Publika endpoints

GET /blog-posts
Hämtar alla blogginlägg (sorterade nyast först)

GET /blog-posts/:id
Hämtar ett enskilt blogginlägg

### Skyddade endpoints (kräver JWT)

POST /blog-posts
Skapar nytt blogginlägg

PUT /blog-posts/:id
Uppdaterar befintligt blogginlägg

DELETE /blog-posts/:id
Tar bort blogginlägg

Exempel på body vid skapande/uppdatering:
```json
{
  "title": "Titel",
  "description": "Text",
  "image": "/images/bild.jpg",
  "date": "2026-02-19"
}
```

image och date är valfria. Om datum inte anges används CURRENT_TIMESTAMP.
