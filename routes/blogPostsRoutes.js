import { addBlogPost, deleteBlogPostById, getAllBlogPosts, getBlogPostById, updateBlogPost } from './blogPosts.js'; // Importerar controller-funktionerna från blogPosts.js

export async function routes(fastify) {
    // Registrerar GET-route och kopplar till controller-funktionen
    fastify.get('/blog-posts', getAllBlogPosts); // Route för att hämta alla blogginlägg
    fastify.get('/blog-posts/:id', getBlogPostById); // Route för att hämta ett blogginlägg med specifikt id
    fastify.post('/blog-posts', addBlogPost); // Route för att lägga till nytt blogginlägg
    fastify.put('/blog-posts/:id', updateBlogPost); // Route för att uppdatera ett blogginlägg med specifikt id
    fastify.delete('/blog-posts/:id', deleteBlogPostById); // Route för att radera ett blogginlägg med specifikt id
};