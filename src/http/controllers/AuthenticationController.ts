import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError';
import { makeAuthenticateService } from '@/services/factories/makeAuthenticateService';

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBodySchema.parse(request.body);

  const authenticationService = makeAuthenticateService();

  try {
    await authenticationService.execute({
      email,
      password,
    });
    1;
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send();
}
