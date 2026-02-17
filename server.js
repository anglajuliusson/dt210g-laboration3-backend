// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors' // Importera cors
import './config/db.js'
import { routes as blogPosts } from './routes/blogPostsRoutes.js'; // Importera route-funktionerna från blogPostsRoutes.js

const fastify = Fastify({ logger: true }); 

// Aktivera CORS
await fastify.register(cors, {
  origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] // Tillåt alla origins (utveckling) och alla metoder
})

// Registrera routes så att alla definierade endpoints blir tillgängliga
fastify.register(blogPosts);

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
};