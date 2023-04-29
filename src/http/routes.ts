import { FastifyInstance } from 'fastify';
import { register } from './controllers/RegisterController';
import { authentication } from './controllers/AuthenticationController';
import { profile } from './controllers/ProfileController';
import { verifyJWT } from './middlewares/VerifyJWT';

export async function routes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authentication);

  // authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
