import { FastifyInstance } from 'fastify';
import { register } from './controllers/RegisterController';

export async function routes(app: FastifyInstance) {
  app.post('/users', register);
}
