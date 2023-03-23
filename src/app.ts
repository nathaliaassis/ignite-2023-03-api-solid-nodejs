import fastify from 'fastify';
import { ZodError, z } from 'zod';
import { prisma } from './lib/prisma';
import { routes } from './http/routes';
import { env } from './env';

export const app = fastify();

app.register(routes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: log with an external tool like datalog/newrelic/sentry
  }

  return reply.status(500).send({
    message: 'Internal server error',
  });
});
