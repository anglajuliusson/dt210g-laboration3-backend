import { excuteQuery } from '../config/db.js' // Importera hjälpfunktionen för att köra SQL-frågor mot MySQL

// Funktion som hämtar alla blogginlägg från databasen
export const getAllBlogPosts = async(req, reply) => {
    try {
        // Anropar excuteQuery för att skicka SQL till databasen
        // Resultatet returneras som ett Promise och hanteras med await
        let blogPostsData = await excuteQuery("select * from blog_posts", []);
        reply.status(200).send(blogPostsData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som hämtar ett specifikt blogginlägg baserat på ID
export const getBlogPostById = async(req, reply) => {
    let id = req.params.id;
    try {
        let blogPostsData = await excuteQuery("select * from blog_posts where id=?", [id]);
        reply.status(200).send(blogPostsData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Funktion som lägger till nytt blogginlägg
export const addBlogPost = async(req, reply) => {
    try {
        const { title, description, image } = req.body;

            // Validering: kolla att title är en icke-tom sträng
            if (!title || typeof title !== 'string' || title.trim() === '') {
                return reply.status(400).send({ error: "Titel måste fyllas i korrekt." });
            }

            // Validering: kolla att description är en icke-tom sträng
            if (!description || typeof description !== 'string' || description.trim() === '') {
                return reply.status(400).send({ error: "Beskrivning måste fyllas i korrekt." });
            }    
                  

        // SQL-fråga för att lägga till todo
        let blogPostsData = await excuteQuery("insert into blog_posts(title, description, image) values(?, ?, ?)",
            [
                title, 
                description, 
                image,
            ]
        );
        reply.status(201).send({ message: "Blogginlägg skapat!", blogPostsData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som uppdaterar ett specifikt blogginlägg baserad på ID
export const updateBlogPost = async(req, reply) => {
    let id = req.params.id;
    try {
        const { title, description, image, date } = req.body;

            // Validering: kolla att title är en icke-tom sträng
            if (!title || typeof title !== 'string' || title.trim() === '') {
                return reply.status(400).send({ error: "Titel måste fyllas i korrekt." });
            }

            // Validering: kolla att description är en icke-tom sträng
            if (!description || typeof description !== 'string' || description.trim() === '') {
                return reply.status(400).send({ error: "Beskrivning måste fyllas i korrekt." });
            }   

        // SQL-fråga för att uppdatera todo
        let blogPostsData = await excuteQuery(`update blog_posts set title=?, description=?, image=?, date=? where id=${id}`,
            [ 
                title, 
                description, 
                image, 
                date
            ]
        );
        reply.status(201).send({ message: "Blogginlägg uppdaterat!", blogPostsData});
    } catch (err) {
        reply.status(400).send(err);
    }
};

// Funktion som raderar ett specifikt blogginlägg baserat på ID
export const deleteBlogPostById = async(req, reply) => {
    let id = req.params.id;
    try {
        let blogPostsData = await excuteQuery("delete from blog_posts where id=?", [id]);
        reply.status(200).send({ message: "Blogginlägg raderat!", blogPostsData});
    } catch (err) {
        reply.status(500).send(err);
    }
};